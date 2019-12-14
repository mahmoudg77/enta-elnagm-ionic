import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 form:FormGroup;
  constructor(private formBuilder:FormBuilder) { 
    this.form=this.formBuilder.group({
      phone:['',[Validators.required,Validators.maxLength(12),Validators.minLength(10)]],
      password:['',Validators.required],

    });

  }

  ngOnInit() {
  
  }

}
