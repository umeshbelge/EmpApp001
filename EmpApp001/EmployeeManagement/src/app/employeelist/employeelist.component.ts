import { Component, OnInit } from '@angular/core';

import { Employee } from "../employee";
import { EmployelistService } from '../employelist.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  emplist:Employee;
  
  dtTrigger: Subject<any> = new Subject();

  constructor(private empservice:EmployelistService) { 
  
    console.log('list const');    

  }
  

  ngOnInit() {
    console.log('list oni');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.empservice.getAllEmployees().subscribe((data:Employee) => {
      console.log(data);
      this.emplist = data;
      this.dtTrigger.next();   
    });            
  }
  
  
  


}
