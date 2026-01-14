import { Routes } from '@angular/router';
import { Students } from './student/student';

export const routes: Routes = [
    {path: '', redirectTo: '/students', pathMatch: 'full'},
    { path: 'students', component: Students }
];
