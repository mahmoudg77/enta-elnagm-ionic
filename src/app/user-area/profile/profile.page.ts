import { ProfileService } from './../../services/bll/profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  data:any={};
  video:any;
  constructor(private profile:ProfileService,
    private domSanitizer: DomSanitizer,
    private auth:AuthService,
    private router:Router,
    ) { }

  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    
      this.profile.getMyProfile(data=>{
        console.log(data);
        this.data=data;
        if(this.data.user.talent_file!=null)this.video=this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.user.talent_file);
      }
    );
  }
   
  logout(){
    this.auth.logout(next=>this.router.navigateByUrl("/home"),error=>this.router.navigateByUrl("/home"));
  }
}
