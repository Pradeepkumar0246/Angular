import { Component, computed, inject } from '@angular/core';
import { FoodService } from '../food';
import { Food } from '../../Models/Food.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-deatil',
  imports: [],
  templateUrl: './food-deatil.html',
  styleUrl: './food-deatil.css'
})
export class FoodDeatil {
  foodservice=inject(FoodService);
  route=inject(ActivatedRoute);
  router=inject(Router);

  food: Food={ id: 0, name: '', price: 0, category: '', imageUrl: '' };

   ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); 
    if (id) {
      this.foodservice.getFoodbyId(id).subscribe({
        next: (data) => this.food = data,
        error: (err) => console.error("Error loading food detail:", err)
      });
    }
  
  }

  AddFood(food: Food) {
    this.foodservice.addToCart(food.id).subscribe(() => {
      alert(`${food.name} added to cart`);
      this.router.navigate(['/cart']);
    });
  }
}
