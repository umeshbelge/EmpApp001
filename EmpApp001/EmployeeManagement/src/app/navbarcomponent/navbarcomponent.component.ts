import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbarcomponent',
  templateUrl: './navbarcomponent.component.html',
  styleUrls: ['./navbarcomponent.component.css']
})
export class NavbarcomponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logOut(){
    let token = 'token';

    localStorage.removeItem(token);
  }
}
