export interface Item {
  id: string;
  name: string;
  price: number;
  standardPrice: number;
  expressPrice: number;
  active?: boolean;
}

export interface Subservice {
  id: string;
  name: string;
  isOpen: boolean;
  price?: number;
  items: Item[];
  active: boolean;
  pricePerKg: number;
  pricePerItem: number;
  expressPricePerKg: number;
  expressPricePerItem: number;
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
  active: boolean;
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
  parentServiceId: string;
  parentSubserviceId: string;
}

export interface EditItem {
  id: string;
  name: string;
  price: string | number;
  standardPrice: string | number;
  expressPrice: string | number;
  parentServiceId: string;
  parentSubserviceId: string;
}
