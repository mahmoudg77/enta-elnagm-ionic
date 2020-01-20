import { ProfileService } from './../services/bll/profile.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-talent-profile',
  templateUrl: './talent-profile.page.html',
  styleUrls: ['./talent-profile.page.scss'],
})
export class TalentProfilePage implements OnInit {
 
  data:any={};
  video:any;
  id:number;
  constructor(private profile:ProfileService,
    private domSanitizer: DomSanitizer,
    private route:ActivatedRoute
    ) { }

    ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];

        this.profile.getProfile(this.id,data=>{
          this.data=data;
          if(this.data.user.talent_file!=null)this.video=this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.user.talent_file);
        }
      );
  });
  }
   
  

 

}
