export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  onSale: boolean;
  rating: number;
}
export interface Review {
  user: string;
  comment: string;
}
export interface User {
  name: string;
  email: string;
}
