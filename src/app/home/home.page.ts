import { environment } from './../../environments/environment';
import { PostService } from './../services/bll/articles.service';
import { SharedService } from './../services/shared.service';
import { LoadingService } from './../services/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { TalentService } from './../services/bll/talent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides,{static: true}) slider:IonSlides;
  public environment=environment;
  constructor(        
    private loading:LoadingService,
    public shared:SharedService,
    private posts:PostService,
    private talent:TalentService,
    ) { }
  slides:any[];
  slideOpts = {
    effect: 'flip',
    loop:true,
  };
  about:any={};
  contests:any[];
  phone:string;
  whatsapp:string;
  
ngOnInit(event=null) {
    this.loading.present();
   
    this.posts.getPosts('Slider',{},next=>this.slides=next);

    this.talent.getAll(next=>this.contests=next);

    this.slider.startAutoplay();
    this.posts.getBySlug('about',
                      next=>{this.about=next;this.loading.dismiss();},err=>{this.loading.dismiss();});


    this.phone="201143184244";
    this.whatsapp="201280386126";

    if(event)event.target.complete();
  }
   
   next(){
    this.slider.slideNext();
  }
  prev(){
    this.slider.slidePrev();
  }
  openExternal(url){
    this.loading.present();
    window.open(url,'_self');
    this.loading.dismiss();
  }
}
