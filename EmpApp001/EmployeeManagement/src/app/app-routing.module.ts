import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EmployeelistComponent } from './employeelist/employeelist.component';
import {CreateemployeeComponent } from './createemployee/createemployee.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { CanActivateGuard } from './can-activate.guard';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
const routes: Routes = [
  {path:'',component:LoginFormComponent},
  {path:'login',component:LoginFormComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgotpwd',component:ForgotpwdComponent},
  {path:'list',component:EmployeelistComponent,canActivate:[CanActivateGuard]},
  {path:'list/:id',component:EmployeedetailComponent,canActivate:[CanActivateGuard]},
  {path:'list/edit/:id',canDeactivate:[CanDeactivateGuard],component:EditemployeeComponent,canActivate:[CanActivateGuard]},
  {path:'create',component:CreateemployeeComponent,canActivate:[CanActivateGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
