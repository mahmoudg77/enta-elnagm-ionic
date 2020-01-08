import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form:FormGroup;
  loading:boolean=false;
  constructor(private formBuilder:FormBuilder,private auth:AuthService,private route:Router) { 
    this.form=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    });

  }

  ngOnInit() {
    
  }
  onSubmit(){
    if(!this.form.valid) return ;
    this.loading=true;
    this.auth.userLogin(this.form.get('email').value,this.form.get('password').value,next=>{
      console.log("dddddd");
      this.loading=false;
      this.route.navigateByUrl('/home');
    },error=>{
      this.loading=false;
    });

  }
}
