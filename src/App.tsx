import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Info, 
  MessageSquare, 
  Search, 
  ArrowRight,
  Quote,
  Heart,
  Plus,
  Globe,
  Sparkles,
  ArrowLeft,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { categories, quotes, Category, people, Person } from './constants';
import { auth, db } from './lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useLanguage } from './contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Adolph_Tidemand_%26_Hans_Gude_-_Bridal_Procession_on_the_Hardangerfjord_-_Google_Art_Project.jpg" 
          alt="Brudeferden i Hardanger" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-nordic-snow/20 backdrop-blur-[1px]"></div>
      
      {/* Liquid Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--blob-1)] rounded-full blur-3xl animate-blob -z-10 transition-colors duration-1000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--blob-2)] rounded-full blur-3xl animate-blob animation-delay-2000 -z-10 transition-colors duration-1000"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-white relative"
      >
        <div className="absolute -inset-10 bg-white/5 backdrop-blur-md rounded-[4rem] -z-10 border border-white/10"></div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight drop-shadow-2xl">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl text-nordic-stone font-light mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#kategorier" 
            className="bg-white/90 backdrop-blur-md text-nordic-forest px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg hover:shadow-xl"
          >
            {t('hero.explore')} <ChevronRight size={20} />
          </a>
          <a 
            href="#om" 
            className="bg-white/10 text-white border border-white/40 backdrop-blur-md px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all"
          >
            {t('hero.about')}
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div className="w-px h-12 bg-white"></div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const { t } = useLanguage();
  return (
  <section id="om" className="section-spacing bg-nordic-snow relative overflow-hidden transition-colors duration-1000">
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl animate-blob -z-10"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl animate-blob animation-delay-4000 -z-10"></div>
    
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
      <div className="liquid-glass p-10 rounded-[3rem]">
        <div className="flex items-center gap-2 text-nordic-stone mb-4">
          <Info size={18} />
          <span className="text-sm font-medium uppercase tracking-widest">{t('about.label')}</span>
        </div>
        <h2 className="text-4xl md:text-5xl mb-8 leading-tight">{t('about.title')}</h2>
        <div className="space-y-6 text-lg text-nordic-stone leading-relaxed">
          <p>
            {t('about.p1')}
          </p>
          <p>
            {t('about.p2')}
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-[4/5] bg-nordic-mist rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/30">
          <img 
            src="https://picsum.photos/seed/norway-nature/800/1000" 
            alt="Norsk natur" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 liquid-glass p-8 rounded-3xl max-w-xs hidden lg:block">
          <Quote className="text-nordic-stone mb-4 opacity-20" size={40} />
          <p className="italic text-nordic-slate mb-2">{t('about.quote')}</p>
        </div>
      </div>
    </div>
  </section>
  );
};

const CategoryCard = ({ category, onClick }: { category: Category, onClick: () => void, key?: string | number }) => {
  const Icon = category.icon;
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className={`liquid-glass p-8 rounded-[2.5rem] cursor-pointer transition-all border border-white/50 group relative overflow-hidden`}
    >
      <div className={`absolute inset-0 opacity-10 -z-10 ${category.color}`}></div>
      <div className="bg-white/80 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all">
        <Icon className="text-nordic-slate" size={28} />
      </div>
      <h3 className="text-2xl mb-3">{category.title}</h3>
      <p className="text-nordic-stone mb-6 line-clamp-2">{category.description}</p>
      <div className="flex items-center text-sm font-semibold gap-2 group-hover:gap-3 transition-all text-nordic-forest">
        Utforsk <ArrowRight size={16} />
      </div>
    </motion.div>
  );
};

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { t } = useLanguage();

  return (
    <section id="kategorier" className="section-spacing bg-nordic-snow relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{t('categories.title')}</h2>
          <p className="text-nordic-stone max-w-2xl mx-auto text-lg">
            {t('categories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              onClick={() => setSelectedCategory(cat)} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-nordic-slate/20 backdrop-blur-md"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/80 backdrop-blur-2xl rounded-[3rem] max-w-2xl w-full p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`absolute top-0 left-0 w-full h-3 opacity-30 ${selectedCategory.color}`}></div>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute top-8 right-8 text-nordic-stone hover:text-nordic-slate bg-nordic-mist/50 p-2 rounded-full transition-all"
              >
                <Plus className="rotate-45" size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-white/50 p-4 rounded-2xl shadow-sm">
                  <selectedCategory.icon size={32} />
                </div>
                <h3 className="text-3xl font-serif">{selectedCategory.title}</h3>
              </div>
              
              <p className="text-xl text-nordic-stone mb-10 leading-relaxed">
                {selectedCategory.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-nordic-stone">Utvalde eksempel</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCategory.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-white/40 rounded-2xl border border-white/60 shadow-sm">
                      <div className="w-2 h-2 bg-nordic-forest rounded-full"></div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-nordic-mist/30 flex justify-between items-center">
                <button className="text-nordic-forest font-semibold flex items-center gap-2 hover:underline">
                  Les meir om {selectedCategory.title.toLowerCase()} <ChevronRight size={18} />
                </button>
                <div className="flex gap-2">
                  <button className="p-3 bg-white/50 hover:bg-white rounded-full transition-all shadow-sm">
                    <Heart size={20} className="text-nordic-stone" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const InteractiveSection = () => {
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSuggestion('');
      }, 3000);
    }
  };

  return (
    <section className="section-spacing bg-nordic-snow relative overflow-hidden transition-colors duration-1000">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl animate-blob -z-10"></div>
      
      <div className="max-w-4xl mx-auto liquid-glass p-16 rounded-[4rem] text-center relative">
        <Sparkles className="mx-auto mb-6 text-nordic-stone" size={40} />
        <h2 className="text-4xl mb-6">{t('interactive.title')}</h2>
        <p className="text-lg text-nordic-stone mb-10">
          {t('interactive.subtitle')}
        </p>
        
        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
          <input 
            type="text" 
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Ditt forslag..."
            className="w-full px-8 py-5 rounded-full border border-white/60 bg-white/50 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-nordic-forest/10 pr-36 text-lg shadow-inner"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-nordic-forest text-white px-8 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg"
          >
            Send inn
          </button>
        </form>
        
        <AnimatePresence>
          {submitted && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 text-emerald-600 font-medium bg-emerald-50 py-2 px-4 rounded-full inline-block"
            >
              Takk for ditt bidrag! Forslaget er sendt til vurdering.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Reflection = () => {
  const { t } = useLanguage();
  return (
    <section id="refleksjon" className="section-spacing bg-nordic-forest relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent -z-10"></div>
      
      <div className="max-w-4xl mx-auto text-center relative">
        <MessageSquare className="mx-auto mb-8 opacity-30" size={48} color="white" />
        <h2 className="text-4xl md:text-5xl mb-12 text-white">{t('reflection.title')}</h2>
        <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">{t('reflection.p1')}</p>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
        {[
          {
            title: "Kven blir inkludert?",
            desc: "Historisk har kanon-lister ofte vore prega av eit snevert utval. Korleis sikrar vi at dagens kanon speglar heile breidda i det norske samfunnet?"
          },
          {
            title: "Tradisjon vs. mangfald",
            desc: "Korleis kan vi ta vare på den klassiske arven samstundes som vi gjer plass til nye stemmer og fleirkulturelle impulsar?"
          },
          {
            title: "Kven har blitt gløymde?",
            desc: "Det er viktig å rette blikket mot dei som tidlegare har falle utanfor – kvinner, minoritetar og motkulturelle rørsler."
          },
          {
            title: "Kultur som spegel",
            desc: "Kva seier kulturen vår om oss som folk i dag? Er kanonen eit bilete av kven vi var, eller kven vi ønskjer å vere?"
          }
        ].map((item, idx) => (
          <div key={idx} className="liquid-glass-dark p-8 rounded-[2.5rem] border border-white/10">
            <h3 className="text-2xl font-serif text-white mb-4">{item.title}</h3>
            <p className="text-nordic-mist/70 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

const QuoteSection = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-nordic-mist/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Quote className="mx-auto text-nordic-stone opacity-20" size={60} />
            <p className="text-3xl md:text-4xl font-serif italic leading-snug">
              "{quotes[currentQuote].text}"
            </p>
            <p className="text-lg font-medium text-nordic-stone uppercase tracking-widest">
              — {quotes[currentQuote].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
  <footer className="bg-nordic-snow border-t border-nordic-mist pt-20 pb-10 px-6 md:px-12 transition-colors duration-1000">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-nordic-forest rounded-full flex items-center justify-center text-white font-serif italic text-2xl">K</div>
            <span className="font-serif text-2xl font-bold tracking-tight">Norsk Kulturkanon</span>
          </div>
          <p className="text-nordic-stone text-lg max-w-md leading-relaxed">
            {t('footer.description')}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">{t('footer.links')}</h4>
          <ul className="space-y-4 text-nordic-stone">
            <li><Link to="/" className="hover:text-nordic-slate transition-colors">{t('footer.home')}</Link></li>
            <li><a href="#om" className="hover:text-nordic-slate transition-colors">{t('nav.about')}</a></li>
            <li><a href="#kategorier" className="hover:text-nordic-slate transition-colors">{t('nav.categories')}</a></li>
            <li><a href="#refleksjon" className="hover:text-nordic-slate transition-colors">{t('nav.reflection')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">{t('footer.contact')}</h4>
          <ul className="space-y-4 text-nordic-stone">
            <li>post@kulturkanon.no</li>
            <li>Oslo, Norge</li>
            <li className="pt-4 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-nordic-mist flex items-center justify-center hover:bg-nordic-forest hover:text-white transition-all cursor-pointer">
                <Globe size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-nordic-mist flex items-center justify-center hover:bg-nordic-forest hover:text-white transition-all cursor-pointer">
                <MessageSquare size={18} />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-nordic-mist pt-8 flex flex-col md:row justify-between items-center gap-4 text-nordic-stone text-sm">
        <p>© 2026 Norsk Kulturkanon. {t('footer.rights')}</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-nordic-slate">Personvern</a>
        </div>
      </div>
    </div>
  </footer>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-full py-3 px-6 md:py-4 md:px-8 flex justify-between items-center transition-all duration-500 liquid-glass`}>
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-nordic-forest rounded-full flex items-center justify-center text-white font-serif italic text-lg md:text-xl">K</div>
        <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-nordic-slate hidden sm:block">Kulturkanon</span>
      </Link>
      <div className="hidden lg:flex gap-8 text-sm font-medium uppercase tracking-widest text-nordic-slate items-center">
        <a href="#om" className="hover:text-nordic-stone transition-colors">{t('nav.about')}</a>
        <a href="#kategorier" className="hover:text-nordic-stone transition-colors">{t('nav.categories')}</a>
        <Link to="/galleri" className="hover:text-nordic-stone transition-colors">{t('nav.gallery')}</Link>
        <a href="#refleksjon" className="hover:text-nordic-stone transition-colors">{t('nav.reflection')}</a>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        {/* Language Toggle */}
        <div className="flex bg-white/50 backdrop-blur-md rounded-full shadow-sm overflow-hidden p-1 border border-white/20">
          <button 
            onClick={() => setLanguage('nn')} 
            className={`text-xs font-bold px-3 py-1 pb-[0.2rem] rounded-full transition-all ${language === 'nn' ? 'bg-nordic-forest text-white' : 'text-nordic-stone hover:text-nordic-slate'}`}
          >
            NN
          </button>
          <button 
            onClick={() => setLanguage('nb')} 
            className={`text-xs font-bold px-3 py-1 pb-[0.2rem] rounded-full transition-all ${language === 'nb' ? 'bg-nordic-forest text-white' : 'text-nordic-stone hover:text-nordic-slate'}`}
          >
            NB
          </button>
        </div>

        {user ? (
          <div className="flex items-center gap-3 ml-2">
            <span className="text-xs font-semibold text-nordic-stone hidden sm:block">{user.displayName}</span>
            <div className="w-8 h-8 rounded-full bg-nordic-mist flex items-center justify-center overflow-hidden border border-white/20 shadow-sm relative group cursor-pointer" onClick={handleLogout}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover group-hover:opacity-20 transition-opacity" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon size={14} className="text-nordic-stone group-hover:opacity-0 transition-opacity" />
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <LogOut size={14} className="text-rose-500" />
              </div>
            </div>
          </div>
        ) : (
          <button onClick={handleLogin} className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 ml-2 rounded-full bg-white/50 hover:bg-white/80 border border-white/40 shadow-sm text-xs font-semibold uppercase tracking-widest text-nordic-slate transition-all whitespace-nowrap">
            <UserIcon size={14} className="hidden sm:block" /> {t('nav.login')}
          </button>
        )}
      </div>
    </nav>
  );
};

const GalleryPage = () => {
  const { t } = useLanguage();
  const [firebasePeople, setFirebasePeople] = useState<Person[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', role: '', period: '', description: '', image: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = auth.onAuthStateChanged(setUser);
    fetchPeople();
    return () => unsubscribe();
  }, []);

  const fetchPeople = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'people'));
      const fetched = querySnapshot.docs.map(doc => doc.data() as Person);
      setFirebasePeople(fetched);
    } catch (e) {
      console.error("Error fetching people", e);
    }
  };

  const handleAddPerson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPerson.name || !newPerson.role) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'people'), newPerson);
      setNewPerson({ name: '', role: '', period: '', description: '', image: '' });
      setShowAddForm(false);
      fetchPeople();
    } catch (e) {
      console.error("Error adding person", e);
    }
    setIsSubmitting(false);
  };

  const frameStyles = ['glass-frame', 'glass-frame-dark', 'glass-frame-accent'];
  const allPeople = [...people, ...firebasePeople];

  return (
    <div className="min-h-screen gallery-wall pt-32 pb-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background Blobs for Nordic feel */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[var(--blob-1)] rounded-full blur-3xl animate-blob -z-10 transition-colors duration-1000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--blob-2)] rounded-full blur-3xl animate-blob animation-delay-2000 -z-10 transition-colors duration-1000"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6"
          >
            <Link to="/" className="flex items-center gap-2 text-nordic-stone hover:text-nordic-slate transition-colors uppercase tracking-widest text-xs font-bold">
              <ArrowLeft size={14} /> {t('gallery.back')}
            </Link>
          </motion.div>
          <h1 className="text-5xl md:text-7xl text-nordic-slate font-serif mb-6 tracking-tight">{t('gallery.title')}</h1>
          <div className="w-24 h-1 bg-nordic-forest/20 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-nordic-stone max-w-2xl mx-auto font-light mb-8">
            {t('gallery.subtitle')}
          </p>
          {user && !showAddForm && (
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-nordic-forest text-white px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md"
            >
              <Plus size={16} className="inline mr-2" /> {t('gallery.add_button')}
            </button>
          )}
        </header>

        {showAddForm && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mb-20 bg-white/50 backdrop-blur-md p-8 rounded-[3rem] border border-white/40 shadow-xl">
            <h3 className="text-2xl font-serif text-nordic-slate mb-6 text-center">{t('gallery.add_title')}</h3>
            <form onSubmit={handleAddPerson} className="flex flex-col gap-4">
              <input type="text" placeholder={t('gallery.add_name')} value={newPerson.name} onChange={e => setNewPerson({...newPerson, name: e.target.value})} className="px-6 py-4 rounded-full bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-nordic-forest/30" required />
              <input type="text" placeholder={t('gallery.add_role')} value={newPerson.role} onChange={e => setNewPerson({...newPerson, role: e.target.value})} className="px-6 py-4 rounded-full bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-nordic-forest/30" required />
              <input type="text" placeholder={t('gallery.add_period')} value={newPerson.period} onChange={e => setNewPerson({...newPerson, period: e.target.value})} className="px-6 py-4 rounded-full bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-nordic-forest/30" />
              <input type="text" placeholder={t('gallery.add_image')} value={newPerson.image} onChange={e => setNewPerson({...newPerson, image: e.target.value})} className="px-6 py-4 rounded-full bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-nordic-forest/30" />
              <textarea placeholder="Beskrivelse / Description" value={newPerson.description} onChange={e => setNewPerson({...newPerson, description: e.target.value})} className="px-6 py-4 rounded-3xl bg-white/60 border border-white/50 focus:outline-none focus:ring-2 focus:ring-nordic-forest/30 min-h-[120px]" required />
              <div className="flex gap-4 justify-end mt-4">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 rounded-full text-nordic-stone hover:text-nordic-slate font-semibold uppercase tracking-widest text-sm transition-colors">{t('gallery.add_cancel')}</button>
                <button type="submit" disabled={isSubmitting} className="bg-nordic-forest text-white px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-opacity-90 transition-all disabled:opacity-50">{t('gallery.add_submit')}</button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-12 space-y-16">
          {allPeople.map((person, idx) => {
            const frameStyle = frameStyles[idx % frameStyles.length];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="break-inside-avoid flex flex-col items-center"
              >
                <div className={`picture-frame ${frameStyle} group cursor-pointer hover:scale-[1.02] transition-all duration-500`}>
                  <div className="relative overflow-hidden rounded-2xl bg-black/5 backdrop-blur-sm">
                    <img 
                      src={person.image || 'https://images.unsplash.com/photo-1599021200155-24231b6dfa25?w=600&auto=format&fit=crop&q=80'} 
                      alt={person.name} 
                      className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex justify-center">
                    <div className="plaque group-hover:bg-white/80 transition-colors duration-500">
                      <div className="plaque-text">{person.name}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center max-w-[280px]">
                  <p className="text-nordic-forest text-[11px] uppercase tracking-[0.2em] font-bold mb-2">{person.role}</p>
                  <p className="text-nordic-stone text-sm leading-relaxed font-serif">
                    {person.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { t } = useLanguage();
  return (
    <>
      <Hero />
      <About />
      <QuoteSection />
      <Categories />
      <InteractiveSection />
      <Reflection />
      <section className="section-spacing bg-nordic-snow text-center transition-colors duration-1000">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl mb-8">{t('join.title')}</h2>
          <p className="text-xl text-nordic-stone mb-10 leading-relaxed">
            {t('join.subtitle')}
          </p>
          <button className="bg-nordic-forest text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-opacity-90 transition-all shadow-xl">
            {t('join.button')}
          </button>
        </div>
      </section>
    </>
  );
};

const useNorwayTime = () => {
  const [timeOfDay, setTimeOfDay] = useState<'night' | 'dawn' | 'day' | 'dusk' | 'evening'>('day');

  useEffect(() => {
    const updateTheme = () => {
      try {
        const norwayHour = parseInt(new Intl.DateTimeFormat('en-GB', {
          hour: 'numeric',
          hour12: false,
          timeZone: 'Europe/Oslo'
        }).format(new Date()));

        if (norwayHour >= 0 && norwayHour < 5) setTimeOfDay('night');
        else if (norwayHour >= 5 && norwayHour < 9) setTimeOfDay('dawn');
        else if (norwayHour >= 9 && norwayHour < 18) setTimeOfDay('day');
        else if (norwayHour >= 18 && norwayHour < 21) setTimeOfDay('dusk');
        else setTimeOfDay('evening');
      } catch (e) {
        // Fallback to UTC+2 if Intl fails
        const now = new Date();
        const fallbackHour = (now.getUTCHours() + 2) % 24;
        if (fallbackHour >= 0 && fallbackHour < 5) setTimeOfDay('night');
        else if (fallbackHour >= 5 && fallbackHour < 9) setTimeOfDay('dawn');
        else if (fallbackHour >= 9 && fallbackHour < 18) setTimeOfDay('day');
        else if (fallbackHour >= 18 && fallbackHour < 21) setTimeOfDay('dusk');
        else setTimeOfDay('evening');
      }
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
};

export default function App() {
  const timeOfDay = useNorwayTime();
  
  useEffect(() => {
    const root = document.documentElement;
    const themeClasses = ['theme-night', 'theme-dawn', 'theme-day', 'theme-dusk', 'theme-evening'];
    root.classList.remove(...themeClasses);
    root.classList.add(`theme-${timeOfDay}`);
  }, [timeOfDay]);

  return (
    <HashRouter>
      <div className="min-h-screen selection:bg-nordic-forest selection:text-white transition-colors duration-1000">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galleri" element={<GalleryPage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}
