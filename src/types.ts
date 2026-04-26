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

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  allergens: Allergen[];
  image?: string;
  featured?: boolean;
}
