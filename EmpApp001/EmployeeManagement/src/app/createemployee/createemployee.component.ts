import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { EmployelistService } from '../employelist.service';
import { Employee } from '../employee';
@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css']
})
export class CreateemployeeComponent implements OnInit {
  addingEmployee:FormGroup;
  clicked:boolean = false;
  postData:any;
  promise: Promise<unknown>;
  promiseData: Promise<unknown>;
  constructor(private formBuilder: FormBuilder,private router: Router,private empservice :EmployelistService) { }

  DOBminDate: Date;
  DOBmaxDate: Date;
  JoinedonMaxdate:Date;
  ngOnInit() {
    this.addingEmployee = this.formBuilder.group({
      title:['',Validators.required],
      firstName:['',Validators.required],
      middleName:['',Validators.required],
      lastName:['',Validators.required],
      empId:['',Validators.required],
      Joinedon:['',Validators.required],
      DOB:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      designation:['',Validators.required]
    });

    this.DOBminDate = new Date();
    this.DOBmaxDate = new Date();
    this.JoinedonMaxdate = new Date();

    this.DOBminDate.setFullYear(this.DOBminDate.getFullYear()- 100);
    this.DOBmaxDate.setFullYear(this.DOBmaxDate.getFullYear() - 18);

    this.JoinedonMaxdate.setDate(this.JoinedonMaxdate.getDate()-10);

    
  }
  

    
  onSubmit(){
    if(!this.addingEmployee.valid)
    {
      this.clicked = true;
      return false;
    }
    
    //console.log(this.addingEmployee.value);
    this.postData = {
      "imgPath":"./assets/x.jpg",
      "name":this.addingEmployee.value.title+" "+this.addingEmployee.value.firstName+" "+this.addingEmployee.value.middleName+" "+this.addingEmployee.value.lastName,
      "empId":this.addingEmployee.value.empId,
      "DOB":""+this.addingEmployee.value.DOB.getDate()+"/"+(this.addingEmployee.value.DOB.getMonth()+1)+"/"+this.addingEmployee.value.DOB.getFullYear(),
      "joined_on":""+this.addingEmployee.value.Joinedon.getDate()+"/"+(this.addingEmployee.value.Joinedon.getMonth()+1)+"/"+this.addingEmployee.value.Joinedon.getFullYear(),
      "email_address":this.addingEmployee.value.email,
      "Designation":this.addingEmployee.value.designation
    }
    //console.log(this.empservice.save(this.postData));
    this.promiseData = new Promise((resolve,reject) => {
       
      let s=this.empservice.save(this.postData)

      if(s!==undefined)
      {  
        resolve();
      }
    })
    
    this.promiseData.then(()=> {
      //setTimeout(function(){
        this.router.navigate(['list']); 
      //},500)  
      
    })
      //this.router.navigate(['list']); 
      //this.addingEmployee.reset();
       
    
    //this.router.navigateByUrl('/list');
  }
  

}
