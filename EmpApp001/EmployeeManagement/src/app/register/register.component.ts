import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployelistService } from '../employelist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;

  constructor(private formbuilder : FormBuilder,private empservice:EmployelistService,private router:Router) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      username:['',Validators.required],
      emailid:['',[Validators.required, Validators.email]],
      password:['',Validators.required],
      cpassword:['',Validators.required]
    })
  }

  onSubmit(){
    console.log(this.registerForm.value)

    if(this.registerForm.value.password!==this.registerForm.value.cpassword)
    {
      alert("Please enter the same password in both inputs");
      return false;
    }
    
    this.empservice.register({"username":this.registerForm.value.username,"emailid":this.registerForm.value.emailid,"password":this.registerForm.value.password}).subscribe();
  

    this.router.navigate(['login'])
  }
}
