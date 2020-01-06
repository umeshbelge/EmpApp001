import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeeManagement';
  loginStatus:any='false';
  constructor(){
    // this.setLocaleStorage();
    console.log('main appp comp')
    let key = 'loginStatus';
    console.log(this.loginStatus)
    //this.loginStatus = localStorage.getItem('loginStatus');
    console.log(localStorage.getItem('loginStatus'))
  }
  // setLocaleStorage(){
  //   let key = 'loginStatus';
  //   localStorage.setItem(key,'false');
  // }
  
  getLocalStorage(){
    // let key = 'loginStatus';
    // console.log('innn')
    // this.loginStatus = localStorage.getItem('key');
    // return this.loginStatus
  }
  
  logOut(){
    let token = 'token';
    let statusKey = 'loginStatus'; 
    localStorage.setItem(statusKey,'false');
    localStorage.removeItem(token);
  }
}
