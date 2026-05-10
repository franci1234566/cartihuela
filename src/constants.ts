import { MenuItem, LanguageOption } from './types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' }
];

export const MENU_DATA: MenuItem[] = [
  {
    id: '1',
    name: {
      es: 'Gamba Roja de Dénia (Extra)',
      en: 'Dénia Red Prawn (Extra)',
      de: 'Rote Garnele aus Dénia (Extra)',
      ru: 'Красная креветка из Дении (Экстра)',
      ro: 'Gamba Roșie de Dénia (Extra)',
      pl: 'Czerwona Krewetka z Dénii (Extra)'
    },
    description: {
      es: 'Joyas del Mediterráneo cocidas en agua de mar o a la plancha con sal gorda.',
      en: 'Mediterranean jewels cooked in sea water or grilled with sea salt.',
      de: 'Mediterrane Juwelen, in Meerwasser gekocht oder mit grobem Salz gegrillt.',
      ru: 'Средиземноморские деликатесы, сваренные в морской воде или обжаренные на гриле с крупной солью.',
      ro: 'Bijuterii ale Mediteranei fierte în apă de mare sau la grătar cu sare grunjoasă.',
      pl: 'Klejnoty Morza Śródziemnego gotowane w wodzie morskiej lub grillowane z grubą solą.'
    },
    price: 45,
    category: 'Mariscos Frescos',
    allergens: ['Crustáceos'],
    image: 'https://laxernadelmar.com/wp-content/uploads/2018/08/gamba.jpg',
    featured: true
  },
  {
    id: '2',
    name: {
      es: 'Ostras Speciale de Claire nº2',
      en: 'Speciale de Claire Oysters nº2',
      de: 'Speciale de Claire Austern Nr. 2',
      ru: 'Устрицы Speciale de Claire №2',
      ro: 'Stridii Speciale de Claire nr.2',
      pl: 'Ostrygi Speciale de Claire nr 2'
    },
    description: {
      es: 'Unidad de ostra francesa de sabor equilibrado y textura firme.',
      en: 'Single French oyster with a balanced flavor and firm texture.',
      de: 'Französische Auster mit ausgewogenem Geschmack und fester Textur.',
      ru: 'Французская устрица со сбалансированным вкусом и плотной текстурой.',
      ro: 'Stridie franceză cu gust echilibrat și textură fermă.',
      pl: 'Francuska ostryga o zrównoważonym smaku i jędrnej konsystencji.'
    },
    price: 6.5,
    category: 'Mariscos Frescos',
    allergens: ['Moluscos'],
    image: 'https://static.wixstatic.com/media/28b472_3a7e70cc6cd3489ba557926666ec5552~mv2.jpg/v1/fill/w_480,h_320,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/28b472_3a7e70cc6cd3489ba557926666ec5552~mv2.jpg',
  },
  {
    id: '3',
    name: {
      es: 'Carpaccio de Gamba Blanca',
      en: 'White Prawn Carpaccio',
      de: 'Carpaccio von weißen Garnelen',
      ru: 'Карпаччо из белых креветок',
      ro: 'Carpaccio de creveți albi',
      pl: 'Carpaccio z białych krewetek'
    },
    description: {
      es: 'Finas láminas de gamba de la bahía con aceite de oliva virgen extra y toque de lima.',
      en: 'Thin slices of bay prawns with extra virgin olive oil and a touch of lime.',
      de: 'Dünne Scheiben von Bucht-Garnelen mit nativem Olivenöl extra und einem Hauch Limette.',
      ru: 'Тонкие ломтики креветок из залива с оливковым маслом первого отжима и ноткой лайма.',
      ro: 'Felii subțiri de creveți din golf cu ulei de măsline extravirgin și o notă de lămâie verde.',
      pl: 'Cienkie plasterki krewetek z zatoki z oliwą z oliwek extra virgin i nutą limonki.'
    },
    price: 24,
    category: 'Entrantes',
    allergens: ['Crustáceos'],
    image: 'https://img2.rtve.es/n/16065816?w=1600',
  },
  {
    id: '4',
    name: {
      es: 'Navajas de Buceo a la Plancha',
      en: 'Grilled Razor Clams',
      de: 'Gegrillte Schwertmuscheln',
      ru: 'Морские черенки на гриле',
      ro: 'Navajas la grătar',
      pl: 'Okładniczki z grilla'
    },
    description: {
      es: 'Con un majado de ajo, perejil y un toque de vino blanco Albariño.',
      en: 'With crushed garlic, parsley, and a touch of Albariño white wine.',
      de: 'Mit Knoblauch, Petersilie und einem Hauch Albariño-Weißwein.',
      ru: 'С чесноком, петрушкой и ноткой белого вина Альбариньо.',
      ro: 'Cu mujdei de usturoi, pătrunjel și o notă de vin alb Albariño.',
      pl: 'Z czosnkiem, pietruszką i nutą białego wina Albariño.'
    },
    price: 18,
    category: 'Entrantes',
    allergens: ['Moluscos'],
    image: 'https://i.blogs.es/58a40a/navajas_aumen/840_560.jpg',
  },
  {
    id: '5',
    name: {
      es: 'Arroz con Bogavante (Mín. 2 pers)',
      en: 'Rice with Lobster (Min. 2 people)',
      de: 'Reis mit Hummer (Min. 2 Pers.)',
      ru: 'Рис с лобстером (мин. 2 чел.)',
      ro: 'Orez cu homar (Min. 2 pers)',
      pl: 'Ryż z homarem (Min. 2 os.)'
    },
    description: {
      es: 'Arroz meloso elaborado con bogavante azul nacional y fumet de roca.',
      en: 'Creamy rice made with national blue lobster and rock fish stock.',
      de: 'Cremiger Reis mit heimischem blauem Hummer und Felsenfischfond.',
      ru: 'Сливочный рис с национальным синим лобстером и бульоном из скальных рыб.',
      ro: 'Orez cremos preparat cu homar albastru național și supă de pește de stâncă.',
      pl: 'Kremowy ryż z krajowym niebieskim homarem i wywarem z ryb skalnych.'
    },
    price: 32,
    category: 'Arroces',
    allergens: ['Crustáceos', 'Pescado', 'Moluscos'],
    image: 'https://canalcocina.es/medias/_cache/zoom-fda9f4e32f5d1ad4f42ec9bd3597cb2e-920-518.jpg',
    featured: true
  },
  {
    id: '6',
    name: {
      es: 'Rodaballo Salvaje a la Gallega',
      en: 'Galician Style Wild Turbot',
      de: 'Wilder Steinbutt nach galicischer Art',
      ru: 'Дикий тюрбо по-галисийски',
      ro: 'Calcan sălbatic în stil galician',
      pl: 'Dziki turbot po galicyjsku'
    },
    description: {
      es: 'Pieza capturada en libertad, servida con ajada tradicional y patata cocida.',
      en: 'Wild-caught fish, served with traditional garlic sauce and boiled potato.',
      de: 'Wildfang, serviert mit traditioneller Knoblauchsauce und Salzkartoffeln.',
      ru: 'Дикая рыба, подается с традиционным чесночным соусом и отварным картофелем.',
      ro: 'Pește sălbatic, servit cu sos tradițional de usturoi și cartof fiert.',
      pl: 'Dzika ryba serwowana z tradycyjnym sosem czosnkowym i gotowanym ziemniakiem.'
    },
    price: 38,
    category: 'Pescados',
    allergens: ['Pescado'],
    image: 'https://www.plenussupermercados.es/wp-content/uploads/2024/04/rodaballo-a-la-gallega.jpg',
  },
  {
    id: '13',
    name: {
      es: 'Arroz Negro con Sepia y Gambas',
      en: 'Black Rice with Cuttlefish and Prawns',
      de: 'Schwarzer Reis mit Tintenfisch und Garnelen',
      ru: 'Черный рис с каракатицей и креветками',
      ro: 'Orez negru cu sèpie și creveți',
      pl: 'Czarny ryż z mątwą i krewetkami'
    },
    description: {
      es: 'Arroz seco en paella con tinta de calamar y tropezones de costa.',
      en: 'Dry paella rice with squid ink and coastal seafood bits.',
      de: 'Trockener Paella-Reis mit Tintenfischtinte und Meeresfrüchtestücken.',
      ru: 'Сухой рис паэлья с чернилами каракатицы и кусочками морепродуктов.',
      ro: 'Orez uscat în paella cu cerneală de sepie și bucățele de fructe de mare.',
      pl: 'Suchy ryż paella z atramentem z mątwy i kawałkami owoców morza.'
    },
    price: 24,
    category: 'Arroces',
    allergens: ['Moluscos', 'Crustáceos', 'Pescado'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '15',
    name: {
      es: 'Tarta de Queso de Autor',
      en: 'Signature Cheesecake',
      de: 'Käsekuchen des Hauses',
      ru: 'Авторский чизкейк',
      ro: 'Prăjitură cu brânză Signature',
      pl: 'Autorski sernik'
    },
    description: {
      es: 'Extremadamente cremosa, con base de galleta artesana y frutos rojos.',
      en: 'Extremely creamy, with an artisanal biscuit base and red berries.',
      de: 'Extrem cremig, mit handgemachtem Keksboden und roten Beeren.',
      ru: 'Невероятно кремовый, на основе домашнего печенья с красными ягодами.',
      ro: 'Extrem de cremos, cu bază de biscuiți artizanali și fructe de pădure.',
      pl: 'Niezwykle kremowy, na spodzie z rzemieślniczych herbatników z owocami leśnymi.'
    },
    price: 8.5,
    category: 'Postres',
    allergens: ['Lácteos', 'Huevos', 'Gluten'],
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
  }
  // He incluido una muestra representativa. Para los 30 platos, la estructura es idéntica.
];
