import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { CreateemployeeComponent } from './createemployee/createemployee.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlighterDirective } from './highlighter.directive';

import { DataTablesModule } from 'angular-datatables';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthInterceptor } from './interceptor';
import { NavbarcomponentComponent } from './navbarcomponent/navbarcomponent.component';
import { RegisterComponent } from './register/register.component';
import { CanActivateGuard } from './can-activate.guard';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeelistComponent,
    CreateemployeeComponent,
    EmployeedetailComponent,
    HighlighterDirective,
    EditemployeeComponent,
    LoginFormComponent,
    NavbarcomponentComponent,
    RegisterComponent,
    ForgotpwdComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [CanDeactivateGuard,CanActivateGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
