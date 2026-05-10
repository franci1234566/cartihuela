import { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Info, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  X,
  Waves,
  Award,
  Sparkles,
  Wheat,
  Fish,
  Milk,
  CircleDot,
  Anchor,
  Ship,
  Shell,
  Calendar,
  Users,
  MessageCircle,
  Plus,
  Minus,
  Menu as MenuIcon,
  LayoutGrid,
  List as ListIcon,
  ArrowUpDown,
  Clock3,
  Globe // Importado para el selector de idiomas
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_DATA, LANGUAGES } from './constants'; // Añadido LANGUAGES
import { Category, MenuItem, Allergen, Language } from './types'; // Añadido Language

const CATEGORIES: Category[] = ['Entrantes', 'Mariscos Frescos', 'Arroces', 'Pescados', 'Vinos', 'Postres'];

const ALLERGEN_UI: Record<Allergen, { icon: any; label: string; color: string }> = {
  'Gluten': { icon: Wheat, label: 'G', color: 'text-amber-400' },
  'Crustáceos': { icon: Fish, label: 'C', color: 'text-red-400' },
  'Pescado': { icon: Fish, label: 'P', color: 'text-blue-400' },
  'Moluscos': { icon: Fish, label: 'M', color: 'text-indigo-400' },
  'Lácteos': { icon: Milk, label: 'L', color: 'text-sky-300' },
  'Huevos': { icon: CircleDot, label: 'H', color: 'text-yellow-200' },
  'Soja': { icon: Info, label: 'S', color: 'text-green-400' },
  'Cacahuetes': { icon: Info, label: 'Ca', color: 'text-orange-400' },
  'Frutos de cáscara': { icon: Info, label: 'F', color: 'text-orange-300' },
  'Apio': { icon: Info, label: 'A', color: 'text-emerald-400' },
  'Mostaza': { icon: Info, label: 'Mo', color: 'text-yellow-500' },
  'Sésamo': { icon: Info, label: 'Sé', color: 'text-zinc-400' },
  'Dióxido de azufre': { icon: Info, label: 'Su', color: 'text-purple-400' },
  'Altramuces': { icon: Info, label: 'Al', color: 'text-yellow-600' },
};

const INITIAL_RES_DATA = {
  name: '',
  date: '',
  time: '13:30',
  guests: 2,
  message: ''
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('es'); // Estado para el idioma
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resData, setResData] = useState(INITIAL_RES_DATA);

  const logoPlaceholder = "https://live.staticflickr.com/3925/14773301108_666733aff5_b.jpg";

  const sendWhatsApp = () => {
    const text = `🌊 *NUEVA RESERVA - LA CARIHUELA* 🌊%0A%0A✨ *DETALLES:*%0A👤 *Nombre:* ${resData.name}%0A📅 *Fecha:* ${resData.date}%0A🕒 *Hora:* ${resData.time}%0A👥 *Personas:* ${resData.guests}%0A%0A💌 *Nota:*%0A${resData.message || '_Sin peticiones adicionales_'}%0A%0A🐚 _Por favor, confírmenme disponibilidad. ¡Gracias!_`;
    window.open(`https://wa.me/34647753664?text=${text}`, '_blank');
    setIsReservationOpen(false);
    setResData(INITIAL_RES_DATA);
  };

  const filteredMenu = useMemo(() => {
    let result = MENU_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      // Búsqueda multi-idioma: busca en el idioma actualmente seleccionado
      const matchesSearch = item.name[selectedLanguage].toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description[selectedLanguage].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    result.sort((a, b) => {
      const catA = CATEGORIES.indexOf(a.category);
      const catB = CATEGORIES.indexOf(b.category);
      if (catA !== catB) return catA - catB;
      return a.name[selectedLanguage].localeCompare(b.name[selectedLanguage]);
    });

    return result;
  }, [selectedCategory, searchQuery, selectedLanguage]);

  return (
    <div className="min-h-screen bg-sea-white selection:bg-sea-blue selection:text-white border-x border-ocean-dark/10 max-w-[1200px] mx-auto flex flex-col md:flex-row shadow-2xl relative overflow-hidden">
      {/* Decorative Background Silhouettes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Anchor className="absolute -top-10 -left-10 w-64 h-64 text-sea-blue/10 rotate-12" />
        <Ship className="absolute top-1/4 -right-16 w-80 h-80 text-sea-blue/5 -rotate-12" />
        <Fish className="absolute bottom-1/4 -left-12 w-48 h-48 text-sea-blue/10 rotate-45" />
        <Shell className="absolute -bottom-10 right-1/4 w-32 h-32 text-sea-blue/10" />
        <Waves className="absolute bottom-0 left-0 w-full h-32 text-sea-blue/5" />
      </div>

      {/* Selector de Idioma Flotante Desktop */}
      <div className="fixed top-6 right-6 z-[60] hidden lg:block">
        <div className="relative">
          <button 
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="bg-white/90 backdrop-blur-md border border-ocean-dark/10 p-3 rounded-full shadow-lg hover:shadow-sea-blue/20 transition-all flex items-center gap-2 group"
          >
            <Globe className="w-5 h-5 text-sea-blue group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest text-ocean-dark">
              {LANGUAGES.find(l => l.code === selectedLanguage)?.code}
            </span>
          </button>

          <AnimatePresence>
            {isLanguageMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 bg-white border border-ocean-dark/10 rounded-2xl shadow-2xl p-2 min-w-[160px] overflow-hidden"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${selectedLanguage === lang.code ? 'bg-sea-blue/10 text-sea-blue font-bold' : 'hover:bg-sea-blue-light text-ocean-dark/70'}`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 border-r border-ocean-dark/10 flex-col sticky top-0 h-screen bg-sea-blue-light/30 backdrop-blur-sm">
        <div className="p-8 space-y-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-ocean-dark rounded-full flex items-center justify-center p-1 shrink-0 bg-white shadow-lg shadow-sea-blue/10">
              <div className="w-full h-full border border-ocean-dark/20 rounded-full flex items-center justify-center">
                <span className="text-ocean-dark font-serif text-xl tracking-tighter">LC</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-widest uppercase leading-tight text-ocean-black">La <span className="text-sea-blue italic">Carihuela</span></h1>
              <p className="text-[9px] tracking-[0.3em] uppercase opacity-80 font-semibold font-sans text-ocean-dark">Tradición Marinera</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-ocean-dark uppercase tracking-[0.2em] mb-4">Categorías</p>
            <button 
              onClick={() => setSelectedCategory('Todos')}
              className={`w-full text-left py-2 px-4 rounded text-sm transition-all ${selectedCategory === 'Todos' ? 'bg-sea-blue text-white font-semibold shadow-md' : 'hover:bg-sea-blue/10 text-ocean-black/80 hover:text-ocean-black'}`}
            >
              {selectedLanguage === 'es' ? 'Todos los Manjares' : 'All Delicacies'}
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left py-2 px-4 rounded text-sm transition-all ${selectedCategory === cat ? 'bg-sea-blue text-white font-semibold shadow-md' : 'hover:bg-sea-blue/10 text-ocean-black/80 hover:text-ocean-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-8">
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="w-full flex items-center justify-center gap-3 bg-ocean-dark text-white py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-ocean-black transition-all shadow-lg shadow-ocean-dark/20 group"
            >
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {selectedLanguage === 'es' ? 'Reservar Mesa' : 'Book a Table'}
            </button>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-ocean-dark/10 bg-sea-blue-light/50">
          <p className="text-[9px] uppercase tracking-widest opacity-80 mb-4 font-bold text-ocean-dark">Atención al Cliente</p>
          <div className="flex items-center gap-3 text-ocean-black">
            <Phone className="w-5 h-5 text-sea-blue" />
            <p className="text-lg font-serif italic">+34 647 753 664</p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative z-10">
        {/* Mobile / Shared Header */}
        <header className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 py-5 border-b border-ocean-dark/10 bg-white/90 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4 lg:hidden w-full justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 -ml-2 text-ocean-black hover:text-sea-blue transition-colors"
                aria-label="Menú"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 border-2 border-ocean-dark rounded-full flex items-center justify-center p-1 bg-white">
                <div className="w-full h-full border border-ocean-dark/20 rounded-full flex items-center justify-center">
                  <span className="text-ocean-dark font-serif text-sm">LC</span>
                </div>
              </div>
              <h1 className="text-base font-bold tracking-widest uppercase italic text-ocean-dark">La <span className="text-sea-blue not-italic">Carihuela</span></h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 bg-sea-blue-light text-sea-blue rounded-full"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsReservationOpen(true)}
                className="p-2.5 bg-sea-blue text-white rounded-full shadow-lg shadow-sea-blue/20"
              >
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isLanguageMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden w-full bg-white border-b border-ocean-dark/10 p-4 grid grid-cols-3 gap-2 mt-2"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`flex flex-col items-center p-2 rounded-xl border ${selectedLanguage === lang.code ? 'border-sea-blue bg-sea-blue/5' : 'border-transparent'}`}
                  >
                    <span className="text-2xl mb-1">{lang.flag}</span>
                    <span className="text-[10px] font-bold uppercase">{lang.code}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden lg:block">
             <h2 className="text-2xl font-serif italic text-ocean-dark">
               {selectedCategory === 'Todos' ? (selectedLanguage === 'es' ? 'Nuestra Carta' : 'Our Menu') : selectedCategory}
             </h2>
          </div>

          <div className="flex-1 max-w-md mx-auto lg:mx-8 w-full group mt-4 lg:mt-0">
            <div className="relative">
              <input 
                type="text" 
                placeholder={selectedLanguage === 'es' ? "Buscar en la carta..." : "Search menu..."} 
                className="w-full bg-sea-blue-light border border-ocean-dark/10 rounded-full py-2 px-6 text-sm focus:outline-none focus:border-sea-blue focus:ring-4 focus:ring-sea-blue/5 transition-all text-ocean-black placeholder:text-ocean-dark/30 shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-dark opacity-30 group-focus-within:opacity-100 group-focus-within:text-sea-blue transition-all" />
            </div>
          </div>

          <div className="hidden lg:block text-right ml-4">
            <p className="text-[10px] uppercase tracking-widest opacity-80 mb-1 text-ocean-black">Almería, España</p>
            <div className="flex items-center justify-end gap-2 text-sea-blue">
              <Waves className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest">PRODUCTO FRESCO</span>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-ocean-black/60 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white z-[70] lg:hidden flex flex-col shadow-2xl"
              >
                <div className="p-6 border-b border-ocean-dark/5 flex justify-between items-center bg-sea-blue-light/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-ocean-dark rounded-full flex items-center justify-center p-0.5 bg-white">
                      <span className="text-ocean-dark font-serif text-[10px]">LC</span>
                    </div>
                    <span className="text-sm font-bold tracking-widest uppercase text-ocean-dark">Menú</span>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-sea-blue-light rounded-full text-ocean-dark/40">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-2">
                  <p className="text-[10px] font-bold text-ocean-dark/40 uppercase tracking-[0.2em] mb-4">Nuestras Categorías</p>
                  <button 
                    onClick={() => { setSelectedCategory('Todos'); setIsMenuOpen(false); }}
                    className={`w-full text-left py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-between ${selectedCategory === 'Todos' ? 'bg-sea-blue text-white font-bold shadow-lg shadow-sea-blue/20' : 'text-ocean-black hover:bg-sea-blue-light'}`}
                  >
                    {selectedLanguage === 'es' ? 'Todos los Manjares' : 'All Delicacies'}
                    {selectedCategory === 'Todos' && <ChevronRight className="w-4 h-4" />}
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setIsMenuOpen(false); }}
                      className={`w-full text-left py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-between ${selectedCategory === cat ? 'bg-sea-blue text-white font-bold shadow-lg shadow-sea-blue/20' : 'text-ocean-black hover:bg-sea-blue-light'}`}
                    >
                      {cat}
                      {selectedCategory === cat && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>

                <div className="p-6 bg-sea-blue-light/50 border-t border-ocean-dark/5">
                   <button 
                    onClick={() => { setIsReservationOpen(true); setIsMenuOpen(false); }}
                    className="w-full bg-ocean-dark text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
                  >
                    {selectedLanguage === 'es' ? 'Reservar Mesa' : 'Book a Table'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 bg-sea-blue-light/50 relative shadow-inner">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
             <Waves className="w-full h-full text-ocean-dark" />
          </div>
          
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mb-10 text-center lg:text-left"
          >
             <h2 className="text-4xl md:text-5xl font-serif italic mb-3 text-ocean-black">
               {selectedLanguage === 'es' ? 'La' : 'The'} <span className="text-sea-blue">{selectedLanguage === 'es' ? 'Esencia' : 'Essence'}</span> {selectedLanguage === 'es' ? 'de la Costa' : 'of the Coast'}
             </h2>
             <p className="text-sm text-ocean-black/80 max-w-xl font-medium leading-relaxed">
               {selectedLanguage === 'es' 
                 ? 'De la lonja a su mesa. Disfrute del sabor más auténtico de Almería con nuestra selección diaria de productos locales.' 
                 : 'From the market to your table. Enjoy the most authentic flavor of Almería with our daily selection of local products.'}
             </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            <AnimatePresence mode="popLayout">
              {filteredMenu.reduce((acc: any[], item, index, array) => {
                const isGrouped = selectedCategory === 'Todos' && searchQuery === '';
                const showCategoryHeader = isGrouped && (index === 0 || array[index-1].category !== item.category);

                if (showCategoryHeader) {
                  acc.push(
                    <motion.div 
                      key={`cat-header-${item.category}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="col-span-full pt-12 first:pt-0 pb-4 mb-4 border-b border-sea-blue/20"
                    >
                      <h2 className="text-2xl font-serif italic text-ocean-dark flex items-center gap-3">
                        <Anchor className="w-6 h-6 text-sea-blue" />
                        {item.category}
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-sea-blue/20 to-transparent ml-4"></div>
                      </h2>
                    </motion.div>
                  );
                }

                acc.push(
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-ocean-dark/10 flex overflow-hidden shadow-sm hover:shadow-xl hover:shadow-sea-blue/5 hover:border-sea-blue/30 transition-all group rounded-2xl min-h-[11rem]"
                  >
                  <div className="p-5 flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 gap-3">
                      <h3 className="text-xl font-serif italic tracking-wide text-ocean-black group-hover:text-sea-blue transition-colors">
                        {item.name[selectedLanguage]}
                      </h3>
                    </div>
                    
                    <p className="text-[12px] text-ocean-black/80 mb-4 font-normal leading-relaxed pr-2 flex-1">
                      {item.description[selectedLanguage]}
                    </p>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                         {item.allergens.map((allergen) => {
                           const ui = ALLERGEN_UI[allergen] || { icon: Info, label: '?', color: 'text-ocean-dark/40' };
                           const AllergenIcon = ui.icon;
                           return (
                             <div key={allergen} className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sea-blue/5 border border-sea-blue/20">
                               <AllergenIcon className={`w-3 h-3 ${ui.color}`} />
                               <span className="text-[9px] font-bold uppercase tracking-tighter text-ocean-dark">{allergen}</span>
                             </div>
                           );
                         })}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-ocean-dark/5">
                        <span className="text-ocean-black font-bold text-xl">{item.price.toLocaleString('es-ES', { minimumFractionDigits: 1 })}€</span>
                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-sea-blue opacity-0 group-hover:opacity-100 transition-opacity">
                           <span>MÁXIMA CALIDAD</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="w-24 sm:w-32 lg:w-40 relative overflow-hidden h-full flex-shrink-0 bg-white border-l border-ocean-dark/5"
                    onClick={() => setFullscreenImage(item.image && item.image.trim() !== "" ? item.image : logoPlaceholder)}
                  >
                    <img 
                      src={item.image && item.image.trim() !== "" ? item.image : logoPlaceholder} 
                      alt={item.name[selectedLanguage]}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== logoPlaceholder) target.src = logoPlaceholder;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    {(!item.image || item.image.trim() === "") && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                         <div className="flex flex-col items-center gap-1">
                           <Anchor className="w-6 h-6 text-sea-blue opacity-40" />
                           <span className="text-[8px] font-bold text-ocean-black/30 tracking-[0.2em] uppercase">La Carihuela</span>
                         </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-ocean-dark/0 group-hover:bg-ocean-dark/10 transition-colors flex items-center justify-center pointer-events-none">
                      <Search className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                    </div>
                    {item.featured && (
                      <div className="absolute top-2 right-2 p-1.5 bg-gold rounded-full shadow-lg">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
                );
                return acc;
              }, [])}
            </AnimatePresence>
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gold/20 mx-auto mb-4" />
              <h3 className="text-lg font-serif text-pearl/40 italic">
                {selectedLanguage === 'es' ? 'No hemos encontrado lo que buscas' : 'We haven\'t found what you\'re looking for'}
              </h3>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
                className="mt-2 text-gold text-sm underline underline-offset-4"
              >
                {selectedLanguage === 'es' ? 'Restablecer carta' : 'Reset menu'}
              </button>
            </div>
          )}
        </main>

        <footer className="bg-sea-blue-light border-t border-ocean-dark/10 py-16 px-6 mt-20 relative z-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
               <h4 className="text-ocean-black font-bold uppercase tracking-widest text-xs mb-6 border-b border-sea-blue pb-4 inline-block">Ubicación</h4>
               <p className="text-ocean-black text-sm leading-loose font-medium">
                 85 Av. de Playa Serena<br/>
                 Roquetas de Mar, Almería<br/>
                 <span className="text-sea-blue font-black tracking-wider">ANDALUCÍA</span>
               </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-ocean-black font-bold uppercase tracking-widest text-xs mb-6 border-b border-sea-blue pb-4 inline-block">Reservas</h4>
              <div className="flex items-center justify-center md:justify-start gap-4 text-ocean-black hover:text-sea-blue transition-colors cursor-pointer" onClick={() => setIsReservationOpen(true)}>
                <Phone className="w-6 h-6" />
                <p className="text-xl font-serif italic font-bold">+34 647 753 664</p>
              </div>
              <p className="text-ocean-dark font-bold text-[10px] uppercase tracking-tighter">Atención 24/7 vía WhatsApp</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-ocean-black font-bold uppercase tracking-widest text-xs mb-6 border-b border-sea-blue pb-4 inline-block">Horario</h4>
              <p className="text-ocean-black text-sm leading-loose font-medium">
                Mediodía: 13:00 - 17:00<br/>
                Cena: 20:00 - 23:30<br/>
                <span className="text-sea-blue font-bold">Lunes Cerrado</span>
              </p>
            </div>
          </div>
          <div className="pt-16 mt-16 border-t border-ocean-dark/10 text-center">
               <p className="text-ocean-black/40 text-[10px] uppercase tracking-[0.4em] font-bold">
                &copy; 2026 La Carihuela · Excelencia Mediterránea
              </p>
          </div>
        </footer>

        {/* Fullscreen Image View */}
        <AnimatePresence>
          {fullscreenImage && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullscreenImage(null)}
                className="absolute inset-0 bg-ocean-black/95 backdrop-blur-xl" 
              />
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 className="relative max-w-5xl w-full max-h-screen p-2"
              >
                 <button 
                  onClick={() => setFullscreenImage(null)}
                  className="absolute -top-12 right-0 p-3 bg-white/10 hover:bg-white text-white hover:text-ocean-black rounded-full transition-all border border-white/20"
                >
                  <X className="w-6 h-6" />
                </button>
                <img 
                  src={fullscreenImage} 
                  alt="Full View" 
                  className="w-full h-full object-contain rounded-xl shadow-2xl shadow-black/50"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Reservation Modal */}
        <AnimatePresence>
          {isReservationOpen && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-y-auto">
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsReservationOpen(false)}
                className="absolute inset-0 bg-sea-blue/90 backdrop-blur-md" 
              />
              <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 50 }}
                 className="relative bg-white rounded-3xl w-full max-w-lg p-8 lg:p-12 shadow-2xl overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-sea-blue-light/50 -rotate-45 translate-x-16 -translate-y-16 rounded-3xl" />
                 
                 <div className="relative z-10">
                   <div className="flex justify-between items-center mb-10">
                      <div>
                        <h3 className="text-3xl font-serif italic text-ocean-dark mb-1">Reserva de Mesa</h3>
                        <p className="text-xs text-ocean-dark/60 tracking-wider">Gestione su velada en La Carihuela</p>
                      </div>
                      <button 
                        onClick={() => setIsReservationOpen(false)}
                        className="p-2 hover:bg-sea-blue-light rounded-full text-ocean-dark/30 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ocean-dark/40 ml-1">Nombre y Apellidos</label>
                        <input 
                          type="text" 
                          placeholder="Ej. Juan Pérez"
                          className="w-full bg-sea-blue-light border border-sea-blue/10 rounded-xl py-3.5 px-5 text-sm focus:outline-none focus:border-sea-blue transition-all"
                          value={resData.name}
                          onChange={(e) => setResData({...resData, name: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-ocean-dark/40 ml-1">Fecha</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              className="w-full bg-sea-blue-light border border-sea-blue/10 rounded-xl py-3.5 px-5 text-sm focus:outline-none focus:border-sea-blue transition-all pr-12"
                              value={resData.date}
                              onChange={(e) => setResData({...resData, date: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-ocean-dark/40 ml-1">Hora</label>
                          <select 
                            className="w-full bg-sea-blue-light border border-sea-blue/10 rounded-xl py-3.5 px-5 text-sm focus:outline-none focus:border-sea-blue transition-all appearance-none"
                            value={resData.time}
                            onChange={(e) => setResData({...resData, time: e.target.value})}
                          >
                            <optgroup label="Almuerzo">
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                              <option value="14:30">14:30</option>
                            </optgroup>
                            <optgroup label="Cena">
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ocean-dark/40 ml-1">Comensales</label>
                        <div className="flex items-center justify-between bg-sea-blue-light border border-sea-blue/10 rounded-xl p-2 px-6">
                          <button 
                            onClick={() => setResData({...resData, guests: Math.max(1, resData.guests - 1)})}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-sea-blue/10 text-sea-blue hover:bg-sea-blue hover:text-white transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-ocean-dark/40" />
                            <span className="text-xl font-bold text-ocean-dark">{resData.guests}</span>
                          </div>
                          <button 
                            onClick={() => setResData({...resData, guests: resData.guests + 1})}
                            className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm border border-sea-blue/10 text-sea-blue hover:bg-sea-blue hover:text-white transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ocean-dark/40 ml-1">Mensaje Extra (Opcional)</label>
                        <textarea 
                          placeholder="Ej. Aniversario, intolerancias específicas..."
                          className="w-full bg-sea-blue-light border border-sea-blue/10 rounded-xl py-3.5 px-5 text-sm focus:outline-none focus:border-sea-blue transition-all h-24 resize-none"
                          value={resData.message}
                          onChange={(e) => setResData({...resData, message: e.target.value})}
                        />
                      </div>

                      <button 
                        onClick={sendWhatsApp}
                        disabled={!resData.name || !resData.date}
                        className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all shadow-xl text-sm ${resData.name && resData.date ? 'bg-[#25D366] text-white hover:scale-[1.02] shadow-green-500/20' : 'bg-ocean-dark/10 text-ocean-dark/30 cursor-not-allowed'}`}
                      >
                        <MessageCircle className="w-5 h-5" />
                        Enviar Vía WhatsApp
                      </button>

                      <p className="text-[9px] text-center text-ocean-dark/30 uppercase tracking-widest italic pt-4">
                        Será redirigido automáticamente a la aplicación WhatsApp
                      </p>
                   </div>
                 </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
