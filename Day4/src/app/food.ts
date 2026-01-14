import { inject, Injectable, signal } from '@angular/core';
import { CartItem, Food } from '../Models/Food.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  // foods=signal<Food[]>([
  //   {id:1,name:"Non-veg Meals",price:150,category:"Non-Veg",imageurl:"food1.png"},
  //   {id:2,name:"Veg-Meals",price:100,category:"Veg",imageurl:"food2.png"},
  //   {id:3,name:"Parotta(NV)",price:70,category:"Non-Veg",imageurl:"food3.png"},
  //   {id:4,name:"Parotta",price:50,category:"Veg",imageurl:"food3.png"},
  // ])
  // cart=signal<Food[]>([]);
  // selectedfood=signal<Food | null>(null);
  // constructor(){}
  // selectFood(food:Food){
  //   this.selectedfood.set(food);
  // }
  // addtocart(food:Food){
  //   this.cart.update((currentcart)=>[...currentcart,food]);
  // }
  // clearcart(){
  //   this.cart.set([]);
  // }
  // removefromcart(id:number){
  //   this.cart.update((currentcart)=>currentcart.filter(item=>item.id!==id));
  // }

  private http=inject(HttpClient);
  private baseurl='https://localhost:7213/api';
  getFoods(): Observable<Food[]>{
    return this.http.get<Food[]>(`${this.baseurl}/Food`);
  }
 getFoodbyId(id:number): Observable<Food>{
    return this.http.get<Food>(`${this.baseurl}/Food/${id}`);
  }
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseurl}/CartItem`);
  }

  addToCart(foodId: number, quantity: number = 1): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseurl}/CartItem`, { foodId, quantity });
  }

  removeFromCart(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/CartItem/${itemId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/CartItem/clear`);
  }

}

