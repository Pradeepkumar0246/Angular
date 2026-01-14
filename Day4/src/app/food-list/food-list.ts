import { Component, inject } from '@angular/core';
import { FoodService } from '../food';
import { FoodDeatil } from '../food-deatil/food-deatil';
import { Food } from '../../Models/Food.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-food-list',
  imports: [RouterModule],
  templateUrl: './food-list.html',
  styleUrl: './food-list.css'
})
export class FoodList {

  private foodservice=inject(FoodService);
  foods:Food[]=[];
   private router=inject(Router);
  ngOnInit(){
    this.foodservice.getFoods().subscribe(data=>this.foods=data);
  }
  viewDeatils(food:Food){
    this.router.navigate(['/food',food.id]);
  }
  AddFood(food:Food){
    this.foodservice.addToCart(food.id).subscribe(() => {
      alert(`${food.name} added to cart`);
      this.router.navigate(['/cart']);
    });
  }
  }
