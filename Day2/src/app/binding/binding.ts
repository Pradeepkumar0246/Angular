import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { product} from './product';
import { CommonModule } from '@angular/common';
import { customer } from './customer';

@Component({
  selector: 'app-binding',
  imports: [FormsModule, CommonModule],
  templateUrl: './binding.html',
  styleUrl: './binding.css'
})
export class Binding {
  Pro:product[]=[
    {proimg:"product.jpg",pronam:"Keyboard",
      proprice:299,prodiscription:"This is good product",proquantity:30,proonsale:true,prorating:4},
    {proimg:"product.jpg",pronam:"Mouse",
      proprice:199,prodiscription:"This is good product",proquantity:0,proonsale:false,prorating:5},
    {proimg:"product.jpg",pronam:"Watch",
      proprice:399,prodiscription:"This is good product",proquantity:10,proonsale:true,prorating:3},
    {proimg:"product.jpg",pronam:"Cloth",
      proprice:499,prodiscription:"This is good product",proquantity:100,proonsale:true,prorating:3},
    {proimg:"product.jpg",pronam:"Mobile",
      proprice:12999,prodiscription:"This is good product",proquantity:300,proonsale:true,prorating:4},
    {proimg:"product.jpg",pronam:"Bottle",
      proprice:99,prodiscription:"This is good product",proquantity:0,proonsale:false,prorating:2}
  ];
  cart:product[]=[];
  addToCart(item: product) {
    if (item.proquantity > 0) {
      this.cart.push(item);
      alert(item.pronam + ' added to cart!');
    } 
  }
  listuser:{username:string,usermail:string}=
    {username:"pradeep",usermail:"pradee@gmail.com"};

    getRatingColor(rating: number): string {
    if (rating >= 4) return 'darkgreen';
    if (rating === 3) return 'darkorange';
    return 'red';
  }
  Customer:customer[]=[
    {csname:"pradeep",csrating:5},
    {csname:"jerry",csrating:3},
    {csname:"tom",csrating:4}
  ]
}
