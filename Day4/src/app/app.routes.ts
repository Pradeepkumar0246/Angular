import { Routes } from '@angular/router';
import { FoodList } from './food-list/food-list';
import { FoodDeatil } from './food-deatil/food-deatil';
import { FoodCart } from './food-cart/food-cart';

export const routes: Routes = [
    {path:'food',component:FoodList},
    {path:'food/:id',component:FoodDeatil},
    {path:'cart',component:FoodCart},
    {path:'**',redirectTo:'food'}
];
