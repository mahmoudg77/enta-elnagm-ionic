import { AppSettingsService } from './../services/bll/app-settings.service';
import { environment } from './../../environments/environment';
import { PostService } from './../services/bll/articles.service';
import { SharedService } from './../services/shared.service';
import { LoadingService } from './../services/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { TalentService } from './../services/bll/talent.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides,{static: true}) slider:IonSlides;
  public environment=environment;
  allow_register: any;
  snapchat: any;
  facebook: any;
  twitter: any;
  instagram: any;
  youtube: any;
  constructor(        
    private loading:LoadingService,
    public shared:SharedService,
    private posts:PostService,
    private talent:TalentService,
    private setting:AppSettingsService,
    private translate:TranslateService
    ) { }
  slides:any[];
  slideOpts = {
    effect: 'flip',
  };
  about:any={};
  contests:any[];
  phone:string;
  whatsapp:string;
  readAllAbout:boolean=false;
  
ngOnInit(event=null) {
    this.loading.present();
   
    this.posts.getPosts('Slider',{},next=>this.slides=next);

    this.talent.getAll(next=>this.contests=next);
    this.setting.reset();
    this.slider.startAutoplay();
    this.posts.getBySlug('about',
                      next=>{this.about=next;this.loading.dismiss();},err=>{this.loading.dismiss();});

    this.setting.getSettings("site_phone","",value=>{
      this.phone=value;
      this.setting.getSettings("app_whatsapp","",value=>{
        this.whatsapp=value;
      });
      this.setting.getSettings("allow_register","",value=>{
        this.allow_register=value;
      });
      this.setting.getSettings("app_instagram","",value=>{
        this.instagram=value;
      });
      this.setting.getSettings("app_twitter","",value=>{
        this.twitter=value;
      });
      this.setting.getSettings("app_facebook","",value=>{
        this.facebook=value;
      });
      this.setting.getSettings("app_snapchat","",value=>{
        this.snapchat=value;
      });
      this.setting.getSettings("app_youtube","",value=>{
        this.youtube=value;
      });
    });

   
 
    if(event)event.target.complete();

    // this.translate.get('dir').subscribe(
    //   v=>{
    //     if(v=="rtl"){

    //       console.log("Option Befor:",this.slideOpts);
    //       th
    //       console.log("Option After:",this.slideOpts);
    //       }
    //     }
    //   );
 
  }
   
   next(){
    this.slider.slideNext();
  }
  prev(){
    this.slider.slidePrev();
  }
  openExternal(url){
    // this.loading.present();
    console.log(url);
    window.open(url,"_self");
    // this.loading.dismiss();
  }
}
