// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AlertService } from './../services/alert/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.form.reset();
  }
  form:FormGroup;
  loading:boolean=false;
  redirectTo:string="/profile";
  constructor(private formBuilder:FormBuilder,
    private auth:AuthService,
    private router:Router,
    private route:ActivatedRoute,
    private alert:AlertService,
    private load:LoadingService,
    // private inapp:InAppBrowser
    ) { 
    this.form=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
    });

  }

  ngOnInit() {
    this.load.present();
    this.route.queryParams.subscribe(pars=>{
      this.redirectTo=pars['next']||this.redirectTo;
      this.load.dismiss();
    });

  }
  onSubmit(){
    if(!this.form.valid) return ;
    this.loading=true;
    this.load.present();
    this.auth.userLogin(this.form.get('email').value,this.form.get('password').value,next=>{
      this.loading=false;
      this.load.dismiss();
      this.router.navigateByUrl(this.redirectTo);
    },error=>{
      this.load.dismiss();
      //this.alert.error("Login",error.message);
      this.loading=false;
    });

  }
 
  resetPassword(){
    window.open("https://entaelnegm.com/en/password/reset");
  }
}
