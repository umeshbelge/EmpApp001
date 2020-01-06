import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable,of } from 'rxjs';
import {employeeList} from './employee-list';

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import {map } from 'rxjs/operators';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class EmployelistService {

  constructor(private http:HttpClient) { }
  

  getAllEmployees(){
    return this.http.get<Employee>('http://localhost:5050/list');
    //return of(employeeList);
  }
  getEmployeeById(id:number|string){
    console.log(id);
    return this.http.get<Employee>('http://localhost:5050/checkemployee/'+id);
      
  }

  save(data){
     //console.log(data) 
    return new Promise((resolve,reject)=>{ 
          this.http.post<Employee>('http://localhost:5050/insertEmployee',
            data, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
          })
          .subscribe((data:Employee) =>{
            resolve(data);
            
          })
    })              
  }

  delete(id){
    return this.http.delete<Employee>('http://localhost:5050/delete/'+id)
  }

  edit(data){
    //console.log(id)
    console.log(data)
    return this.http.put<Employee>('http://localhost:5050/Edit',
    data,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })  
    
  }  

  authenticationService(data){
    return this.http.post<any>('http://localhost:5050/login',data,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  
  register(data){
    console.log(data)
    return this.http.post<any>('http://localhost:5050/register',data,{
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  isUserLoggedIn(){
    return localStorage.getItem('token')===null ? false : true;
  }
}
