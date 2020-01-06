import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployelistService } from './employelist.service';


@Injectable({
  providedIn: 'root'
})


export class CanActivateGuard implements CanActivate  {

  constructor(private router:Router,private empservice:EmployelistService){ 
  
  }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    console.log(this.empservice.isUserLoggedIn)          
    if(this.empservice.isUserLoggedIn())
    {
      return true;
    }
    else
    {
      alert("You are not logged in user!");
      this.router.navigate(['login'])
      return false;
    }
  }
}
