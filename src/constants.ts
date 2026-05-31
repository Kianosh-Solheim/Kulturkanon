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
  name: string;
  role: string;
  description: string;
  image: string;
}

export const people: Person[] = [
  {
    name: "Henrik Ibsen",
    role: "Dramatiker",
    description: "Verdensberømt for sine realistiske samtidsdramaer som 'Et dukkehjem' og 'Peer Gynt'.",
    image: "https://picsum.photos/seed/ibsen/400/500"
  },
  {
    name: "Edvard Munch",
    role: "Billedkunstner",
    description: "Ekspresjonismens far i Norge, mest kjent for 'Skrik' og sine skildringer av menneskesinnets dypeste følelser.",
    image: "https://picsum.photos/seed/munch/400/500"
  },
  {
    name: "Sigrid Undset",
    role: "Forfatter",
    description: "Nobelprisvinner i litteratur, kjent for sine historiske romaner om middelalderen, som 'Kristin Lavransdatter'.",
    image: "https://picsum.photos/seed/undset/400/500"
  },
  {
    name: "Edvard Grieg",
    role: "Komponist",
    description: "Norges fremste komponist som forente norsk folkemusikk med klassisk romantikk.",
    image: "https://picsum.photos/seed/grieg/400/500"
  },
  {
    name: "Mari Boine",
    role: "Musiker",
    description: "En av de viktigste stemmene i moderne samisk musikk, som har brakt joik til et globalt publikum.",
    image: "https://picsum.photos/seed/boine/400/500"
  },
  {
    name: "Harriet Backer",
    role: "Maler",
    description: "En av Norges viktigste kvinnelige malere, kjent for sine interiørstudier og bruk av lys.",
    image: "https://picsum.photos/seed/backer/400/500"
  }
];
