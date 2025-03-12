
export interface Item {
  id: string;
  name: string;
  price: number;
  standardPrice: number;
  expressPrice: number;
  pricePerKg?: number;
  pricePerItem?: number;
}

export interface Subservice {
  id: string;
  name: string;
  isOpen: boolean;
  price?: number;
  items: Item[];
  active: boolean; // Added active state
}

export interface Service {
  id: string;
  name: string;
  isOpen: boolean;
  description: string;
  price: number;
  unit: string;
  isEditing: boolean;
  subServices: Subservice[];
  active: boolean; // Added active state
}

export interface NewSubservice {
  name: string;
  parentServiceId: string;
  price?: string;
}

export interface EditSubservice {
  id: string;
  name: string;
  parentServiceId: string;
  price?: string;
}

export interface NewItem {
  name: string;
  price: string;
  standardPrice: string;
  expressPrice: string;
  pricePerKg?: string;
  pricePerItem?: string;
  parentServiceId: string;
  parentSubserviceId: string;
}

export interface EditItem {
  id: string;
  name: string;
  price: string | number;
  standardPrice: string | number;
  expressPrice: string | number;
  pricePerKg?: string | number;
  pricePerItem?: string | number;
  parentServiceId: string;
  parentSubserviceId: string;
}
