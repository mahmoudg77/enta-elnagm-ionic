import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { ProfileService } from './../services/bll/profile.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.page.html',
  styleUrls: ['./user-area.page.scss'],
})
export class UserAreaPage implements OnInit {
  data:any={user:{photo:{md:'assets/images/profile-photo.jpg'}}};
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
