import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export interface WikimediaImage {
  url: string;
  attributionUrl: string;
  author: string;
  license: string;
}

interface Props {
  onSelect: (image: WikimediaImage) => void;
}

export const WikimediaImageSearch: React.FC<Props> = ({ onSelect }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WikimediaImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setError('');
    setResults([]);

    try {
      const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query + ' filetype:bitmap')}&gsrlimit=12&iiprop=url|extmetadata&origin=*`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.query && data.query.pages) {
        const pages = data.query.pages;
        const images: WikimediaImage[] = Object.keys(pages).map(key => {
          const page = pages[key];
          const imageinfo = page.imageinfo?.[0];
          if (!imageinfo) return null;

          const metadata = imageinfo.extmetadata || {};
          // Strip HTML from artist
          const rawArtist = metadata.Artist?.value || 'Unknown';
          const author = rawArtist.replace(/<[^>]*>?/gm, '').trim();

          return {
            url: imageinfo.url,
            attributionUrl: imageinfo.descriptionurl,
            author: author,
            license: metadata.LicenseShortName?.value || 'Unknown License',
          };
        }).filter(Boolean) as WikimediaImage[];
        
        setResults(images);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setError('Error searching Wikimedia');
    }
    setIsSearching(false);
  };

  return (
    <div className="bg-white/40 p-4 rounded-3xl border border-white/40">
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder={t('gallery.search_image')} 
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch(e);
            }
          }}
          className="flex-1 px-4 py-2 rounded-full bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-nordic-forest/30 text-sm"
        />
        <button 
          type="button" 
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-nordic-slate text-white p-2 px-4 rounded-full hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center justify-center"
        >
          {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 rounded-xl custom-scrollbar">
          {results.map((img, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[3/4] bg-black/5 rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => onSelect(img)}
            >
              <img 
                src={img.url} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                alt="Wikimedia result" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end">
                <p className="text-[10px] text-white/90 truncate">{img.author}</p>
                <p className="text-[10px] text-white/60 truncate">{img.license}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};
