import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'nb' | 'nn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  nb: {
    // Navbar
    'nav.about': 'Om prosjektet',
    'nav.categories': 'Kategorier',
    'nav.gallery': 'Persongalleri',
    'nav.reflection': 'Refleksjon',
    'nav.login': 'Logg inn',
    
    // Hero
    'hero.title': 'Norsk Kulturkanon',
    'hero.subtitle': 'En åpen og levende utforsking av det som har formet norsk kultur, identitet og arv gjennom generasjoner.',
    'hero.explore': 'Utforsk kulturkanonen',
    'hero.about': 'Lær om prosjektet',

    // About
    'about.label': 'Om prosjektet',
    'about.title': 'Hvorfor en norsk kulturkanon?',
    'about.p1': 'En kulturkanon er ikke en lukket liste over hva som er "best", men et utgangspunkt for samtale om hvem vi er og hvor vi kommer fra.',
    'about.p2': 'Gjennom dette prosjektet ønsker vi å løfte frem sentrale verk, kunstnere og fenomen som har preget det norske samfunnet. Vi ser på både den klassiske arven og de moderne uttrykkene som former oss i dag.',
    'about.quote': '"Kultur er det som gjør at vi forstår hverandre uten å bruke ord."',

    // Categories
    'categories.title': 'Hovedkategorier',
    'categories.subtitle': 'Utforsk de ulike feltene som utgjør ryggraden i den norske kulturarven.',
    'categories.explore': 'Utforsk',
    'categories.close': 'Lukk',

    // Interactive
    'interactive.title': 'Kva er viktigast for deg?',
    'interactive.subtitle': 'Velg de tre områdene i kulturarven du mener er viktigst for norsk identitet, og se hva andre tenker.',
    'interactive.button': 'Velg element',
    'interactive.selected': 'Valgt',

    // Reflection
    'reflection.title': 'Et levende arkiv',
    'reflection.p1': 'Hva tar vi med oss videre? En kanon må være levende – den må tåle å bli utfordret, debattert og utvidet i møte med nye generasjoner.',
    'reflection.p2': 'Norsk kultur er i kontinuerlig endring, og morgendagens kanon skrives i dag.',

    // Join
    'join.title': 'Bli med på samtalen',
    'join.subtitle': 'Hvilke bøker, malerier eller hendelser mener du bør være en del av den norske kulturkanonen i morgen?',
    'join.button': 'Delta i debatten',

    // Footer
    'footer.description': 'Utviklet som et konseptuelt design for å utforske norsk kulturarv. En visuell og interaktiv inngang til det som samler oss.',
    'footer.links': 'Snarveier',
    'footer.home': 'Forside',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Alle rettigheter reservert. Dette er et demonstrasjonsprosjekt.',

    // Gallery
    'gallery.back': 'Tilbake til forsiden',
    'gallery.title': 'Persongalleriet',
    'gallery.subtitle': 'De som har formet vår felles historie, presentert i et moderne lys.',
    'gallery.add_button': 'Legg til ny person',
    'gallery.add_title': 'Legg til i galleriet',
    'gallery.add_name': 'Navn',
    'gallery.add_role': 'Rolle/Tittel',
    'gallery.add_period': 'Periode (f.eks. 1828 - 1906)',
    'gallery.add_image': 'Bilde-URL (valgfritt)',
    'gallery.search_image': 'Søk på Wikimedia',
    'gallery.searching': 'Søker...',
    'gallery.attribution': 'Bilde:',
    'gallery.add_cancel': 'Avbryt',
    'gallery.add_submit': 'Legg til',
    'gallery.edit_button': 'Rediger',
    'gallery.edit_title': 'Rediger person',
    'gallery.edit_submit': 'Lagre endringer'
  },
  nn: {
    // Navbar
    'nav.about': 'Om prosjektet',
    'nav.categories': 'Kategoriar',
    'nav.gallery': 'Persongalleri',
    'nav.reflection': 'Refleksjon',
    'nav.login': 'Logg inn',
    
    // Hero
    'hero.title': 'Norsk Kulturkanon',
    'hero.subtitle': 'Ei open og levande utforsking av det som har forma norsk kultur, identitet og arv gjennom generasjonar.',
    'hero.explore': 'Utforsk kulturkanonen',
    'hero.about': 'Lær om prosjektet',

    // About
    'about.label': 'Om prosjektet',
    'about.title': 'Kvifor ein norsk kulturkanon?',
    'about.p1': 'Ein kulturkanon er ikkje ei lukka liste over kva som er "best", men eit utgangspunkt for samtale om kven vi er og kvar vi kjem frå.',
    'about.p2': 'Gjennom dette prosjektet ønskjer vi å løfte fram sentrale verk, kunstnarar og fenomen som har prega det norske samfunnet. Vi ser på både den klassiske arven og dei moderne uttrykka som formar oss i dag.',
    'about.quote': '"Kultur er det som gjer at vi forstår kvarandre utan å bruke ord."',

    // Categories
    'categories.title': 'Hovudkategoriar',
    'categories.subtitle': 'Utforsk dei ulike felta som utgjer ryggraden i den norske kulturarven.',
    'categories.explore': 'Utforsk',
    'categories.close': 'Lukk',

    // Interactive
    'interactive.title': 'Kva er viktigast for deg?',
    'interactive.subtitle': 'Vel dei tre områda i kulturarven du meiner er viktigast for norsk identitet, og sjå kva andre tenker.',
    'interactive.button': 'Vel element',
    'interactive.selected': 'Valt',

    // Reflection
    'reflection.title': 'Eit levande arkiv',
    'reflection.p1': 'Kva tek vi med oss vidare? Ein kanon må vere levande – han må tole å bli utfordra, debattert og utvida i møtet med nye generasjonar.',
    'reflection.p2': 'Norsk kultur er i kontinuerleg endring, og morgondagens kanon blir skriven i dag.',

    // Join
    'join.title': 'Bli med på samtalen',
    'join.subtitle': 'Kva for bøker, måleri eller hendingar meiner du bør vere ein del av den norske kulturkanonen i morgon?',
    'join.button': 'Delta i debatten',

    // Footer
    'footer.description': 'Utvikla som eit konseptuelt design for å utforske norsk kulturarv. Ein visuell og interaktiv inngang til det som samlar oss.',
    'footer.links': 'Snarvegar',
    'footer.home': 'Framside',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Alle rettar reservert. Dette er eit demonstrasjonsprosjekt.',

    // Gallery
    'gallery.back': 'Tilbake til framsida',
    'gallery.title': 'Persongalleriet',
    'gallery.subtitle': 'Dei som har forma vår felles historie, presenterte i eit moderne lys.',
    'gallery.add_button': 'Legg til ny person',
    'gallery.add_title': 'Legg til i galleriet',
    'gallery.add_name': 'Namn',
    'gallery.add_role': 'Rolle/Tittel',
    'gallery.add_period': 'Periode (f.eks. 1828 - 1906)',
    'gallery.add_image': 'Bilete-URL (valfritt)',
    'gallery.search_image': 'Søk på Wikimedia',
    'gallery.searching': 'Søker...',
    'gallery.attribution': 'Bilete:',
    'gallery.add_cancel': 'Avbryt',
    'gallery.add_submit': 'Legg til',
    'gallery.edit_button': 'Rediger',
    'gallery.edit_title': 'Rediger person',
    'gallery.edit_submit': 'Lagre endringar'
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'nb' || saved === 'nn') ? saved : 'nn';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
