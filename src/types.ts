export type Language = 'es' | 'en' | 'de' | 'ru' | 'ro' | 'pl';

export type Category = 'Entrantes' | 'Mariscos Frescos' | 'Arroces' | 'Pescados' | 'Vinos' | 'Postres';

export type Allergen = 
  | 'Gluten' 
  | 'Crustáceos' 
  | 'Huevos' 
  | 'Pescado' 
  | 'Cacahuetes' 
  | 'Soja' 
  | 'Lácteos' 
  | 'Frutos de cáscara' 
  | 'Apio' 
  | 'Mostaza' 
  | 'Sésamo' 
  | 'Dióxido de azufre' 
  | 'Altramuces' 
  | 'Moluscos';

/**
 * Representa un texto traducido en los idiomas soportados.
 */
export interface TranslatedText {
  es: string;
  en: string;
  de: string;
  ru: string;
  ro: string;
  pl: string;
}

export interface MenuItem {
  id: string;
  // Cambiamos string por TranslatedText para soportar multi-idioma
  name: TranslatedText;
  description: TranslatedText;
  price: number;
  category: Category;
  allergens: Allergen[];
  image?: string;
  featured?: boolean;
}

// Interfaz para la configuración de idiomas en la UI
export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}
