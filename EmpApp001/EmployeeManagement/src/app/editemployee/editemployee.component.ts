import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployelistService } from '../employelist.service';
import { Employee } from '../employee';


@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

editEmployee:FormGroup;
  clicked:boolean = false;
  postData:any;
  promise: Promise<unknown>;
  promiseData: Promise<unknown>;
  constructor(private formBuilder: FormBuilder,private router: Router,private empservice :EmployelistService,private route:ActivatedRoute) { }
    
  EmployeeData:Employee;

  DOBminDate: Date;
  DOBmaxDate: Date;
  JoinedonMaxdate:Date;
  ngOnInit() {
    this.editEmployee = this.formBuilder.group({
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

      let id = this.route.snapshot.params['id']
      this.empservice.getEmployeeById(id).subscribe((data:Employee)=>{
        this.EmployeeData = data
        console.log(this.EmployeeData.name.split(" ")[0])
        this.editEmployee = this.formBuilder.group({
          title:[this.EmployeeData.name.split(" ")[0],Validators.required],
          firstName:[this.EmployeeData.name.split(" ")[1],Validators.required],
          middleName:[this.EmployeeData.name.split(" ")[2],Validators.required],
          lastName:[this.EmployeeData.name.split(" ")[3],Validators.required],
          empId:[this.EmployeeData.empId,Validators.required],
          Joinedon:[this.EmployeeData.joined_on,Validators.required],
          DOB:[this.EmployeeData.DOB,Validators.required],
          email:[this.EmployeeData.email_address,Validators.required],
          designation:[this.EmployeeData.Designation,Validators.required]
        });  

        this.DOBminDate = new Date();
        this.DOBmaxDate = new Date();
        this.JoinedonMaxdate = new Date();
    
        this.DOBminDate.setFullYear(this.DOBminDate.getFullYear()- 100);
        this.DOBmaxDate.setFullYear(this.DOBmaxDate.getFullYear() - 18);
    
        this.JoinedonMaxdate.setDate(this.JoinedonMaxdate.getDate()-10);
      })

    //console.log(this.EmployeeData)
  }
  

    
  onSubmit(){
    if(!this.editEmployee.valid)
    {
      this.clicked = true;
      return false;
    }
    
    console.log(this.editEmployee.value);
    this.postData = {
      "imgPath":"./assets/x.jpg",
      "name":this.editEmployee.value.title+" "+this.editEmployee.value.firstName+" "+this.editEmployee.value.middleName+" "+this.editEmployee.value.lastName,
      "empId":this.editEmployee.value.empId,
      "DOB":this.editEmployee.value.DOB,
      "joined_on":""+this.editEmployee.value.Joinedon,
      "email_address":this.editEmployee.value.email,
      "Designation":this.editEmployee.value.designation
    }
    //console.log(this.empservice.save(this.postData));
    this.promiseData = new Promise((resolve,reject) => {
       
      let s=this.empservice.edit(this.postData).subscribe();
      console.log(s);
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
      //this.editEmployee.reset();
       
    
    //this.router.navigateByUrl('/list');
  }

  canDeactivate() {
    console.log(this);
    return !this.editEmployee.touched ? true : (confirm('Discard changes?') ? true : false);
  }

}
