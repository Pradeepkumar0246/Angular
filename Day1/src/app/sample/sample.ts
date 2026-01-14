import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {product} from './product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sample',
  imports: [FormsModule,CommonModule],
  templateUrl: './sample.html',
  styleUrl: './sample.css'
})
export class Sample {
    fname:string = "Tom";
    lname:string = "Jerry";
    imageurl:string = "sample img.webp"

    //Event binding
    count : number =0;
    showpass : boolean = false;

    counter(){
      this.count +=1;
    }
    showpassword(){
      this.showpass=!this.showpass;
    }
    // Two way binding 
    txtvalue: string =" ";
    num1:number=0;
    num2:number=0;
    add:number=0;
    addition(){
    this.add=this.num1+this.num2;
    }
    showpro:boolean=false;

    //function calling
    pro:product[]=[
      {proid:1, name:"pradeep",img:"product.jpg"},
      {proid:2, name:"peter parker",img:"product.jpg"}
    ]
    catogry:string="";
}
