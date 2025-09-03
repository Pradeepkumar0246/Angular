import { Component } from '@angular/core';

@Component({
  selector: 'app-productcard',
  imports: [],
  templateUrl: './productcard.html',
  styleUrl: './productcard.css'
})
export class Productcard {
  product1:{name:string; price : number; instock:boolean; imageurl:string }={
    name : "Watch",
    price: 199.9,
    instock :true,
    imageurl : "product.jpg"
  };
  product2:{name:string; price : number; instock: boolean; imageurl:string }={
    name : "shoes",
    price: 750,
    instock :false,
    imageurl : "product.jpg"
  };
  product3:{name:string; price : number; instock: boolean; imageurl:string }={
    name : "Mouse",
    price: 250,
    instock :true,
    imageurl : "product.jpg"
  };
}
