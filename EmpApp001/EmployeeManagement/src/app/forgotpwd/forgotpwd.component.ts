import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {

  resetPwdForm:FormGroup;

  constructor(private formbuilder : FormBuilder) { }

  ngOnInit() {
    this.resetPwdForm = this.formbuilder.group({
      email:['',[Validators.required, Validators.email]],
    })
  }
  
  onSubmit(){
    
  }

}
