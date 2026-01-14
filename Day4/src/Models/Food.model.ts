export interface Food{
    id:number;
    name:string;
    price:number;
    category:string;
    imageUrl:string;
}
export interface CartItem {
  id?: number;
  foodId: number;
  quantity: number;
  food?: Food;
}

export interface Order {
  id: number;
  orderDate: string;
  cartItems: CartItem[];
}