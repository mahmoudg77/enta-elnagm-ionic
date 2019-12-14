import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder) { 
    this.form=this.formBuilder.group({
      phone:['',[Validators.required,Validators.maxLength(12),Validators.minLength(10)]],
      email:['',[Validators.required,Validators.email]],
      talent:['',Validators.required],
      password:['',Validators.required],
      cpassword:['',Validators.required],
    });

  }

  ngOnInit() {
  }

}
