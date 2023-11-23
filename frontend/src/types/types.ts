export interface Product {
    id: number;
    image: string;
    name: string;
    price_excluding_tax: number;
    tva: number;
    max_available_stock: number;
    ordered_stock: number;
  }