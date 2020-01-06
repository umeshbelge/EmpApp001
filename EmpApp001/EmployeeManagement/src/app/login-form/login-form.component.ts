import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmployelistService } from '../employelist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm:FormGroup;
  isLoggedin:boolean = false;
  constructor(private formBuilder: FormBuilder,private empservice : EmployelistService,private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });  
  }
  
  onSubmit() {
    console.log(this.loginForm.value)
    let token = 'token';
    let key = 'loginStatus';
    this.empservice.authenticationService(this.loginForm.value).subscribe((res:any) =>{
        console.log(res);
        if(res.success)
        {
            localStorage.setItem(token,res.token);
            localStorage.setItem(key,'true')
            this.router.navigate(['/list']);
        }
        else
        {
          alert(res.message);
          this.loginForm.reset();
        }

    })
  }
  
}
