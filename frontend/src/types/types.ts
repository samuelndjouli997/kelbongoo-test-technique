export interface Product {
  id: number;
  image: string;
  name: string;
  price_excluding_tax: number;
  tva: number;
  max_available_stock: number;
  ordered_stock: number;
}

export interface CartItem {
  product: {
    image: string;
    name: string;
    price_excluding_tax: number;
    tva: number;
  };
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  checked_out: boolean;
  checked_out_products: CartItem[];
}

export interface CartAction {
  type: string; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface ProductItem {
  product: {
    id: number; 
  };
  quantity: number;
}