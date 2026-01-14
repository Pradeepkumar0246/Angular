import { Routes } from '@angular/router';
import { DoctorComponent } from './Component/doctor/doctor';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './Component/login/login';
import { DoctorpostComponent } from './Component/doctorpost/doctorpost';
import { RoleGuard } from './guards/role-guard';

export const routes: Routes = [
    {path:'',redirectTo:'Doctors',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {
      path: 'doctors',component: DoctorComponent,
      canActivate: [authGuard]
    },
    {path:'doctors/new',component:DoctorpostComponent,canActivate:[authGuard,RoleGuard],data:{roles:['Admin']}},
    {path:'doctors/edit/:id',component:DoctorpostComponent,canActivate:[authGuard,RoleGuard],data:{roles:['Admin']}}

];
