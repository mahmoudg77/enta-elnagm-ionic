import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder) { 
    this.form=this.formBuilder.group({
      phone:['',[Validators.required,Validators.maxLength(12),Validators.minLength(10)]],
    });
    
  }
  ngOnInit() {
  }
  onSubmit(){}

}
