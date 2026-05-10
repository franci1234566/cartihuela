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
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_DATA, LANGUAGES } from './constants';
import { Category, MenuItem, Allergen, Language } from './types';

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
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('es');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resData, setResData] = useState(INITIAL_RES_DATA);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoPlaceholder = "https://live.staticflickr.com/3925/14773301108_666733aff5_b.jpg";

  const sendWhatsApp = () => {
    const text = `🌊 *NUEVA RESERVA - LA CARIHUELA* 🌊%0A%0A✨ *DETALLES:*%0A👤 *Nombre:* ${resData.name}%0A📅 *Fecha:* ${resData.date}%0A🕒 *Hora:* ${resData.time}%0A👥 *Personas:* ${resData.guests}%0A%0A💌 *Nota:*%0A${resData.message || '_Sin peticiones adicionales_'}%0A%0A🐚 _Por favor, confírmenme disponibilidad. ¡Gracias!_`;
    window.open(`https://wa.me/34647753664?text=${text}`, '_blank');
    setIsReservationOpen(false);
    setResData(INITIAL_RES_DATA);
  };

  const filteredMenu = useMemo(() => {
    let result = MENU_DATA.filter(item => {
      const name = item.name[selectedLanguage] || '';
      const desc = item.description[selectedLanguage] || '';
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    result.sort((a, b) => {
      const catA = CATEGORIES.indexOf(a.category);
      const catB = CATEGORIES.indexOf(b.category);
      if (catA !== catB) return catA - catB;
      return (a.name[selectedLanguage] || '').localeCompare(b.name[selectedLanguage] || '');
    });

    return result;
  }, [selectedCategory, searchQuery, selectedLanguage]);

  return (
    <div className="min-h-screen bg-sea-white selection:bg-sea-blue selection:text-white border-x border-ocean-dark/10 max-w-[1400px] mx-auto flex flex-col md:flex-row shadow-2xl relative overflow-x-hidden">
      
      {/* CAPA DECORATIVA: Siluetas de fondo con Parallax suave */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div style={{ y: scrolled ? -20 : 0 }} className="absolute -top-20 -left-20 opacity-[0.03] text-ocean-dark">
          <Anchor size={400} rotate={15} />
        </motion.div>
        <motion.div style={{ y: scrolled ? 40 : 0 }} className="absolute top-1/3 -right-32 opacity-[0.02] text-sea-blue">
          <Ship size={500} rotate={-10} />
        </motion.div>
        <motion.div style={{ x: scrolled ? 30 : 0 }} className="absolute bottom-1/4 -left-20 opacity-[0.04] text-ocean-dark">
          <Fish size={300} />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-sea-blue/5 to-transparent" />
      </div>

      {/* SELECTOR DE IDIOMA: Desktop Flotante */}
      <div className="fixed top-8 right-10 z-[100] hidden lg:block">
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            className="bg-white/80 backdrop-blur-xl border border-ocean-dark/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3 group hover:border-sea-blue/30 transition-all"
          >
            <div className="bg-sea-blue/10 p-2 rounded-lg group-hover:bg-sea-blue group-hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] uppercase tracking-widest text-ocean-dark/40 font-bold">Idioma</span>
              <span className="text-sm font-bold text-ocean-dark uppercase">
                {LANGUAGES.find(l => l.code === selectedLanguage)?.name}
              </span>
            </div>
          </motion.button>

          <AnimatePresence>
            {isLanguageMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute right-0 mt-4 bg-white/95 backdrop-blur-2xl border border-ocean-dark/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-3 min-w-[200px] overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLanguage(lang.code); setIsLanguageMenuOpen(false); }}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${
                        selectedLanguage === lang.code 
                        ? 'bg-sea-blue text-white font-bold shadow-lg shadow-sea-blue/20' 
                        : 'hover:bg-sea-blue/5 text-ocean-dark/70 hover:text-ocean-dark'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {selectedLanguage === lang.code && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SIDEBAR: Desktop */}
      <aside className="hidden lg:flex w-80 border-r border-ocean-dark/5 flex-col sticky top-0 h-screen bg-white/40 backdrop-blur-md z-20">
        <div className="p-10 space-y-12 relative z-10 flex flex-col h-full">
          {/* Logo Brand */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-5"
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-sea-blue/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="w-14 h-14 border-2 border-ocean-dark rounded-full flex items-center justify-center p-1 bg-white relative shadow-xl shadow-sea-blue/10">
                  <span className="text-ocean-dark font-serif text-2xl tracking-tighter">LC</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-ocean-black leading-none">
                  LA <span className="text-sea-blue font-serif italic block text-3xl mt-1">Carihuela</span>
                </h1>
                <div className="h-0.5 w-12 bg-sea-blue mt-2" />
              </div>
            </motion.div>

            {/* Navigation Categories */}
            <nav className="space-y-1.5 pt-4">
              <p className="text-[10px] font-black text-ocean-dark/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-ocean-dark/20" />
                Categorías
              </p>
              <button 
                onClick={() => setSelectedCategory('Todos')}
                className={`w-full flex items-center justify-between py-3 px-5 rounded-2xl text-sm transition-all group ${
                  selectedCategory === 'Todos' 
                  ? 'bg-ocean-dark text-white font-bold shadow-xl shadow-ocean-dark/20' 
                  : 'hover:bg-sea-blue/10 text-ocean-dark/60 hover:text-ocean-black'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutGrid className={`w-4 h-4 ${selectedCategory === 'Todos' ? 'text-sea-blue' : 'opacity-40'}`} />
                  {selectedLanguage === 'es' ? 'Carta Completa' : 'Full Menu'}
                </div>
                <ChevronRight className={`w-3 h-3 transition-transform ${selectedCategory === 'Todos' ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </button>

              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between py-3 px-5 rounded-2xl text-sm transition-all group ${
                    selectedCategory === cat 
                    ? 'bg-ocean-dark text-white font-bold shadow-xl shadow-ocean-dark/20' 
                    : 'hover:bg-sea-blue/10 text-ocean-dark/60 hover:text-ocean-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-1 rounded-full transition-all ${selectedCategory === cat ? 'bg-sea-blue scale-[3]' : 'bg-ocean-dark/20'}`} />
                    {cat}
                  </div>
                  <ChevronRight className={`w-3 h-3 transition-transform ${selectedCategory === cat ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Reserva Sidebar */}
          <div className="mt-auto space-y-6">
             <div className="bg-ocean-dark rounded-3xl p-6 text-white relative overflow-hidden group shadow-2xl shadow-ocean-dark/40">
                <Anchor className="absolute -right-6 -bottom-6 w-24 h-24 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                <p className="text-[10px] uppercase tracking-widest font-bold text-sea-blue mb-2">Reserva VIP</p>
                <h4 className="text-lg font-serif italic mb-4 leading-tight">Asegure su mesa frente al mar</h4>
                <button 
                  onClick={() => setIsReservationOpen(true)}
                  className="w-full py-3 bg-sea-blue text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-ocean-dark transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Reservar Ahora
                </button>
             </div>

             <div className="flex items-center gap-4 px-2">
                <div className="w-10 h-10 rounded-full bg-sea-blue/10 flex items-center justify-center text-sea-blue">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-ocean-dark/40">Contacto Directo</span>
                  <span className="text-sm font-bold text-ocean-black">+34 647 753 664</span>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* BLOQUE CENTRAL: Header Móvil y Contenido */}
      <div className="flex-1 flex flex-col relative z-10 bg-white/20">
        {/* HEADER MÓVIL: Sticky con efecto Glassmorphism */}
        <header className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 py-5 border-b border-ocean-dark/10 bg-white/90 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4 lg:hidden w-full justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMenuOpen(true)} 
                className="p-2 -ml-2 text-ocean-black bg-sea-blue/5 rounded-xl active:scale-90 transition-transform"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 border-2 border-ocean-dark rounded-full flex items-center justify-center p-1 bg-white">
                <span className="text-ocean-dark font-serif text-sm">LC</span>
              </div>
              <h1 className="text-base font-bold tracking-widest uppercase italic text-ocean-dark">La <span className="text-sea-blue not-italic">Carihuela</span></h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} 
                className="p-2.5 bg-sea-blue-light text-sea-blue rounded-full active:scale-95 transition-all"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsReservationOpen(true)} 
                className="p-3 bg-sea-blue text-white rounded-full shadow-lg shadow-sea-blue/30 active:scale-95 transition-all"
              >
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* MENÚ IDIOMA MÓVIL (DESPLEGABLE BAJO EL HEADER) */}
          <AnimatePresence>
            {isLanguageMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden w-full overflow-hidden bg-white/50 backdrop-blur-sm"
              >
                <div className="p-4 grid grid-cols-3 gap-3">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLanguage(lang.code); setIsLanguageMenuOpen(false); }}
                      className={`flex flex-col items-center gap-1 py-3 rounded-2xl border transition-all ${
                        selectedLanguage === lang.code 
                        ? 'border-sea-blue bg-sea-blue text-white font-bold' 
                        : 'border-ocean-dark/10 bg-white text-ocean-dark/60'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TÍTULO DE SECCIÓN (DESKTOP) */}
          <div className="hidden lg:block">
             <h2 className="text-3xl font-serif italic text-ocean-dark flex items-center gap-4">
               <Waves className="w-8 h-8 text-sea-blue animate-pulse" />
               {selectedCategory === 'Todos' ? (selectedLanguage === 'es' ? 'Nuestra Selección' : 'Our Selection') : selectedCategory}
             </h2>
          </div>

          {/* BARRA DE BÚSQUEDA DINÁMICA */}
          <div className="flex-1 max-w-md mx-auto lg:mx-8 w-full mt-4 lg:mt-0 relative group">
            <div className="absolute inset-0 bg-sea-blue/20 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative">
              <input 
                type="text" 
                placeholder={selectedLanguage === 'es' ? "Buscar delicias del mar..." : "Search seafood delights..."} 
                className="w-full bg-sea-blue-light border border-ocean-dark/10 rounded-full py-3.5 px-6 text-sm focus:outline-none focus:border-sea-blue focus:bg-white transition-all text-ocean-black placeholder:text-ocean-dark/30 shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 bg-sea-blue rounded-full text-white">
                <Search className="w-3 h-3" />
              </div>
            </div>
          </div>
        </header>

        {/* OVERLAY MENÚ MÓVIL (LATERAL) */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                onClick={() => setIsMenuOpen(false)} 
                className="fixed inset-0 bg-ocean-black/80 backdrop-blur-md z-[110] lg:hidden" 
              />
              <motion.div 
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-white z-[120] lg:hidden flex flex-col shadow-[20px_0_60px_rgba(0,0,0,0.3)]"
              >
                <div className="p-8 border-b border-ocean-dark/5 flex justify-between items-center bg-sea-blue-light/30">
                  <div className="flex items-center gap-3">
                    <Anchor className="w-5 h-5 text-sea-blue" />
                    <span className="text-xs font-black tracking-[0.3em] uppercase text-ocean-dark">Navegación</span>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white rounded-full shadow-sm"><X className="w-5 h-5 text-ocean-dark" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  <button 
                    onClick={() => { setSelectedCategory('Todos'); setIsMenuOpen(false); }} 
                    className={`w-full flex items-center justify-between py-4 px-6 rounded-2xl text-sm transition-all ${
                      selectedCategory === 'Todos' ? 'bg-sea-blue text-white font-bold shadow-xl shadow-sea-blue/30' : 'bg-sea-blue-light/50 text-ocean-black'
                    }`}
                  >
                    <span>Todos los Manjares</span>
                    <LayoutGrid size={16} />
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => { setSelectedCategory(cat); setIsMenuOpen(false); }} 
                      className={`w-full flex items-center justify-between py-4 px-6 rounded-2xl text-sm transition-all ${
                        selectedCategory === cat ? 'bg-sea-blue text-white font-bold shadow-xl shadow-sea-blue/30' : 'bg-sea-blue-light/50 text-ocean-black'
                      }`}
                    >
                      <span>{cat}</span>
                      <div className={`w-2 h-2 rounded-full ${selectedCategory === cat ? 'bg-white' : 'bg-sea-blue'}`} />
                    </button>
                  ))}
                </div>
                <div className="p-8 bg-ocean-dark text-white text-center">
                   <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">Reservas Telefónicas</p>
                   <p className="text-xl font-serif italic">+34 647 753 664</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* CONTENIDO PRINCIPAL: LISTA DE PRODUCTOS */}
        <main className="flex-1 p-6 lg:p-12 relative">
          
          {/* HERO TEXT DINÁMICO */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-16 text-center lg:text-left relative"
          >
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sea-blue/10 text-sea-blue text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                <Sparkles size={12} />
                <span>Experiencia Gastronómica</span>
             </div>
             <h2 className="text-5xl md:text-7xl font-serif italic mb-6 text-ocean-black leading-[1.1]">
               {selectedLanguage === 'es' ? 'La' : 'The'} <span className="text-sea-blue relative">
                 {selectedLanguage === 'es' ? 'Esencia' : 'Essence'}
                 <svg className="absolute -bottom-2 left-0 w-full h-3 text-sea-blue/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" /></svg>
               </span> {selectedLanguage === 'es' ? 'de la Costa' : 'of the Coast'}
             </h2>
             <p className="text-lg text-ocean-black/60 max-w-2xl font-medium leading-relaxed italic">
               {selectedLanguage === 'es' 
                 ? '"Del barco a su mesa: seleccionamos cada pieza en la lonja de Almería para garantizar una frescura inigualable."' 
                 : '"From the boat to your table: we select each piece at the Almería fish market to guarantee unmatched freshness."'}
             </p>
          </motion.div>

          {/* GRID DE PLATOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-10 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filteredMenu.reduce((acc: any[], item, index, array) => {
                const isGrouped = selectedCategory === 'Todos' && searchQuery === '';
                const showHeader = isGrouped && (index === 0 || array[index-1].category !== item.category);

                if (showHeader) {
                  acc.push(
                    <motion.div 
                      key={`header-${item.category}`} 
                      initial={{ opacity: 0, x: -30 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="col-span-full pt-16 pb-6 flex items-center gap-6"
                    >
                      <div className="h-[2px] flex-1 bg-gradient-to-r from-sea-blue to-transparent" />
                      <h3 className="text-3xl font-serif italic text-ocean-dark flex items-center gap-3 whitespace-nowrap">
                        <Shell className="w-8 h-8 text-sea-blue" />
                        {item.category}
                      </h3>
                      <div className="h-[2px] w-24 bg-sea-blue/10" />
                    </motion.div>
                  );
                }

                acc.push(
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative"
                  >
                    {/* Tarjeta de Plato */}
                    <div className="bg-white border border-ocean-dark/5 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_30px_60px_rgba(0,102,255,0.12)] transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
                      
                      {/* Imagen con Overlay */}
                      <div className="h-64 sm:h-72 relative overflow-hidden bg-sea-blue-light/30">
                        <motion.img 
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.8 }}
                          src={item.image || logoPlaceholder} 
                          alt={item.name[selectedLanguage]} 
                          className="w-full h-full object-cover cursor-zoom-in"
                          onClick={() => setFullscreenImage(item.image || logoPlaceholder)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ocean-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        {/* Badge de Precio */}
                        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-xl shadow-black/10">
                          <span className="text-xl font-bold text-ocean-dark">
                            {item.price.toLocaleString('es-ES', { minimumFractionDigits: 1 })}€
                          </span>
                        </div>

                        {item.featured && (
                          <div className="absolute top-6 left-6 bg-sea-blue text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                            <Award size={12} /> Sugerencia
                          </div>
                        )}
                      </div>

                      {/* Info del Plato */}
                      <div className="p-8 flex flex-col flex-1 relative">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-2xl font-serif italic text-ocean-black leading-tight group-hover:text-sea-blue transition-colors">
                            {item.name[selectedLanguage]}
                          </h4>
                        </div>
                        
                        <p className="text-[13px] text-ocean-black/50 leading-relaxed font-medium mb-8 flex-1">
                          {item.description[selectedLanguage]}
                        </p>

                        {/* Alérgenos UI */}
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-ocean-dark/5">
                          {item.allergens.map((allergen) => {
                            const ui = ALLERGEN_UI[allergen] || { icon: Info, label: '?', color: 'text-gray-300' };
                            const Icon = ui.icon;
                            return (
                              <div key={allergen} className="group/icon relative">
                                <div className={`w-9 h-9 rounded-full bg-sea-blue-light flex items-center justify-center border border-transparent hover:border-sea-blue/20 hover:bg-white transition-all`}>
                                  <Icon className={`w-4 h-4 ${ui.color}`} />
                                </div>
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-ocean-dark text-white text-[8px] rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  {allergen}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
                return acc;
              }, [])}
            </AnimatePresence>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-ocean-dark py-24 px-10 mt-32 relative overflow-hidden">
          <Anchor className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-white/5 rotate-12" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-10 bg-white/5 backdrop-blur-sm">
               <span className="text-white font-serif text-3xl">LC</span>
            </div>
            <h3 className="text-white text-4xl font-serif italic mb-6">La Carihuela</h3>
            <p className="text-sea-blue/60 text-xs uppercase tracking-[0.5em] font-black mb-12">Marisquería de Tradición · Desde 1978</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white/80">
              <div className="space-y-3">
                <MapPin className="w-6 h-6 text-sea-blue mx-auto" />
                <p className="text-sm font-medium">Paseo Marítimo, 142<br/>04007 Almería, España</p>
              </div>
              <div className="space-y-3">
                <Phone className="w-6 h-6 text-sea-blue mx-auto" />
                <p className="text-sm font-medium">+34 647 753 664<br/>+34 950 123 456</p>
              </div>
              <div className="space-y-3">
                <Clock className="w-6 h-6 text-sea-blue mx-auto" />
                <p className="text-sm font-medium">Mar-Dom: 13:00 - 23:30<br/>Lunes Cerrado</p>
              </div>
            </div>
            
            <div className="mt-20 pt-10 border-t border-white/5">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">
                Desarrollado con pasión por el mar · &copy; 2026 La Carihuela
              </p>
            </div>
          </div>
        </footer>

        {/* MODAL FULLSCREEN IMAGE */}
        <AnimatePresence>
          {fullscreenImage && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-12" onClick={() => setFullscreenImage(null)}>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ocean-black/98 backdrop-blur-2xl" />
               <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative max-w-7xl max-h-full">
                  <img src={fullscreenImage} className="rounded-3xl shadow-[0_0_100px_rgba(0,102,255,0.3)] border border-white/10" alt="Full" />
                  <button className="absolute -top-6 -right-6 p-4 bg-white text-ocean-dark rounded-full shadow-2xl active:scale-90 transition-transform"><X /></button>
               </motion.div>
            </div>
          )}

          {/* MODAL RESERVAS WHATSAPP */}
          {isReservationOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsReservationOpen(false)} className="absolute inset-0 bg-ocean-dark/90 backdrop-blur-md" />
               <motion.div 
                 initial={{ opacity: 0, y: 100, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, scale: 0.9 }}
                 className="relative bg-white rounded-[3rem] w-full max-w-xl shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden"
               >
                 <div className="p-10 lg:p-14">
                    <div className="flex justify-between items-center mb-10">
                       <div>
                          <p className="text-sea-blue text-[10px] font-black uppercase tracking-[0.3em] mb-2">Reserva Directa</p>
                          <h3 className="text-4xl font-serif italic text-ocean-dark leading-none">Solicitud de Mesa</h3>
                       </div>
                       <button onClick={() => setIsReservationOpen(false)} className="p-3 bg-sea-blue-light text-sea-blue rounded-2xl"><X /></button>
                    </div>

                    <div className="space-y-6">
                       <div className="relative group">
                          <input type="text" placeholder="Nombre de la reserva" className="w-full bg-sea-blue-light border border-sea-blue/10 rounded-2xl py-4.5 px-6 text-sm focus:outline-none focus:border-sea-blue transition-all" value={resData.name} onChange={(e) => setResData({...resData, name: e.target.value})} />
                          <Users className="absolute right-5 top-1/2 -translate-y-1/2 text-sea-blue/30 w-5 h-5" />
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <input type="date" className="w-full bg-sea-blue-light border border-sea-blue/10 rounded-2xl py-4.5 px-6 text-sm focus:outline-none" value={resData.date} onChange={(e) => setResData({...resData, date: e.target.value})} />
                            <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-sea-blue/30 w-4 h-4 pointer-events-none" />
                          </div>
                          <div className="relative">
                            <select className="w-full bg-sea-blue-light border border-sea-blue/10 rounded-2xl py-4.5 px-6 text-sm focus:outline-none appearance-none" value={resData.time} onChange={(e) => setResData({...resData, time: e.target.value})}>
                               <option value="13:30">13:30 h</option><option value="14:00">14:00 h</option><option value="14:30">14:30 h</option>
                               <option value="20:30">20:30 h</option><option value="21:00">21:00 h</option><option value="21:30">21:30 h</option>
                            </select>
                            <Clock3 className="absolute right-5 top-1/2 -translate-y-1/2 text-sea-blue/30 w-4 h-4 pointer-events-none" />
                          </div>
                       </div>

                       <div className="flex items-center justify-between bg-sea-blue-light/50 p-6 rounded-3xl border border-sea-blue/5">
                          <span className="text-xs font-black uppercase text-ocean-dark/40 tracking-widest">Número de comensales</span>
                          <div className="flex items-center gap-6">
                             <button onClick={() => setResData({...resData, guests: Math.max(1, resData.guests - 1)})} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-sea-blue active:scale-90 transition-transform"><Minus size={18} /></button>
                             <span className="text-2xl font-serif italic font-bold text-ocean-dark w-8 text-center">{resData.guests}</span>
                             <button onClick={() => setResData({...resData, guests: resData.guests + 1})} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-sea-blue active:scale-90 transition-transform"><Plus size={18} /></button>
                          </div>
                       </div>

                       <textarea 
                          placeholder="Notas (alérgenos, celebración...)" 
                          className="w-full bg-sea-blue-light border border-sea-blue/10 rounded-3xl py-4.5 px-6 text-sm focus:outline-none h-28 resize-none"
                          value={resData.message}
                          onChange={(e) => setResData({...resData, message: e.target.value})}
                       />

                       <button 
                         onClick={sendWhatsApp} 
                         disabled={!resData.name || !resData.date}
                         className="w-full bg-[#25D366] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-30 disabled:grayscale"
                       >
                          <MessageCircle className="w-6 h-6" />
                          {selectedLanguage === 'es' ? 'Confirmar por WhatsApp' : 'Confirm via WhatsApp'}
                       </button>
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
