export interface Tire {
  id: number;
  brand: string;
  model: string;
  size: string;
  season: 'летние' | 'зимние' | 'всесезонные';
  treadDepth: string;
  quantity: number;
  price: number;
  description: string;
  images: string[];
}

export interface Company {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  services: string[];
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
  tireId?: number;
}
