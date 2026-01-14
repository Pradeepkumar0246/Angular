import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Logincomponent } from './components/auth/logincomponent/logincomponent';
import { Registercomponent } from './components/auth/registercomponent/registercomponent';
import { Dashboardcomponent } from './components/dashboardcomponent/dashboardcomponent';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { Profilecomponent } from './components/profilecomponent/profilecomponent';
import { Submitcomponent } from './components/submitcomponent/submitcomponent';
import { Officercomponent } from './components/officercomponent/officercomponent';
import { Admincomponent } from './components/admincomponent/admincomponent';
import { Applicationcomponent } from './components/applicationcomponent/applicationcomponent';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: Logincomponent },
  { path: 'register', component: Registercomponent },

 
  {
    path: 'dashboard',
    component: Dashboardcomponent,
  },
  {
  path: 'admin/applications',
  component: Applicationcomponent
},
  {
    path:'admin',
    component:Admincomponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'dashboard/profile',
    component: Profilecomponent,
  },
  {
    path: 'dashboard/submit/:formId',
    component: Submitcomponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'officer',
    component: Officercomponent, 
    data: { roles: ['Officer'] },
  },

  {
    path: 'user-section',
    component: Dashboardcomponent, 
    // canActivate: [RoleGuard],
    data: { roles: ['User'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
