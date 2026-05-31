import { 
  Book, 
  Palette, 
  Music, 
  History, 
  Mountain, 
  Languages, 
  Sparkles, 
  Globe 
} from 'lucide-react';

export interface Category {
  id: string;
  title: string;
  icon: any;
  description: string;
  items: string[];
  color: string;
}

export const categories: Category[] = [
  {
    id: 'litteratur',
    title: 'Litteratur',
    icon: Book,
    description: 'Fra sagatid til samtidslitteratur – ordene som har formet vår forståelse av verden.',
    items: ['Henrik Ibsen', 'Sigrid Undset', 'Tarjei Vesaas', 'Olav H. Hauge', 'Jon Fosse'],
    color: 'bg-stone-100'
  },
  {
    id: 'biletkunst',
    title: 'Biletkunst',
    icon: Palette,
    description: 'Visuelle uttrykk som fanger det norske lyset, landskapet og menneskesinnet.',
    items: ['Edvard Munch', 'Harriet Backer', 'Tidemand og Gude', 'Theodor Kittelsen'],
    color: 'bg-blue-50'
  },
  {
    id: 'musikk',
    title: 'Musikk',
    icon: Music,
    description: 'Lyden av Norge – fra hardingfele og joik til klassiske mesterverk og moderne pop.',
    items: ['Edvard Grieg', 'Folkemusikk og hardingfele', 'Joik', 'Moderne norske artistar'],
    color: 'bg-rose-50'
  },
  {
    id: 'historie',
    title: 'Historie og samfunn',
    icon: History,
    description: 'Hendelsene og institusjonene som har lagt grunnlaget for det moderne Norge.',
    items: ['Grunnlova 1814', 'Unionsoppløysinga', 'Motstandskampen', 'Velferdsstaten'],
    color: 'bg-slate-100'
  },
  {
    id: 'natur',
    title: 'Natur og friluftsliv',
    icon: Mountain,
    description: 'Vårt forhold til fjell, fjord og vidde – naturen som kilde til identitet.',
    items: ['Fjordar og fjell', 'Skikultur', 'Friluftsliv som identitet', 'Allemannsretten'],
    color: 'bg-emerald-50'
  },
  {
    id: 'spraak',
    title: 'Språk og identitet',
    icon: Languages,
    description: 'Mangfoldet i det norske språket – dialekter, skriftspråk og vår felles stemme.',
    items: ['Bokmål og nynorsk', 'Dialektane', 'Språkstrid og mangfald', 'Ivar Aasen'],
    color: 'bg-orange-50'
  },
  {
    id: 'samisk',
    title: 'Samisk kultur',
    icon: Sparkles,
    description: 'Urfolkets rike arv – en uunnværlig del av den nordiske kulturhistorien.',
    items: ['Språk og joik', 'Duodji', 'Samisk historie', 'Mari Boine'],
    color: 'bg-indigo-50'
  },
  {
    id: 'moderne',
    title: 'Moderne og fleirkulturelt',
    icon: Globe,
    description: 'Et Norge i endring – nye stemmer og impulser som beriker vår felles kanon.',
    items: ['Nye stemmer i litteraturen', 'Kulturelt mangfald', 'Urban kultur', 'Global utveksling'],
    color: 'bg-cyan-50'
  }
];

export const quotes = [
  {
    text: "Å vera i livet, er ein draum.",
    author: "Olav H. Hauge"
  },
  {
    text: "Det er ingen sak å dø, når man har levd.",
    author: "Henrik Ibsen"
  },
  {
    text: "Naturen er det store lærerværelset.",
    author: "Fridtjof Nansen"
  }
];

export interface Person {
  id?: string;
  name: string;
  role: string;
  period?: string;
  description: string;
  image: string;
  attribution?: {
    author: string;
    url: string;
    license: string;
  };
}

export const people: Person[] = [];
