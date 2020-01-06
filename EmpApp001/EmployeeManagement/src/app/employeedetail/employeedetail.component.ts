import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router'; 
import { EmployelistService } from '../employelist.service';
import { switchMap } from 'rxjs/operators';
import { Employee } from '../employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./employeedetail.component.css']
})
export class EmployeedetailComponent implements OnInit {

  employee:Employee;
  constructor(private route:ActivatedRoute,private router:Router,private empservice:EmployelistService) { }

  ngOnInit() { 
    // this.employee = this.route.paramMap.pipe(
    // switchMap((params:ParamMap)=> 
    //   //this.empservice.getEmployeeById(params.get('id')))
    // )
    //console.log(this.employee);

    let id=this.route.snapshot.params['id'];

    this.empservice.getEmployeeById(id).subscribe((data:Employee)=>{
      console.log(data);
      this.employee=data;
      //console.log(this.employee); 
    })
             
     
  
  }
  
  deleteRecord(id){
      this.empservice.delete(id).subscribe((data:Employee) =>{
      
    })
    this.router.navigate(['list']);
  }  
  
  redirectToEditpage(id){
    this.router.navigate(['/list/edit',id]);
  }

}
