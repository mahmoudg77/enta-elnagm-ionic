import { LoadingService } from './../services/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonSlides,{static: true}) slider:IonSlides;

  constructor(        
    private loading:LoadingService,
    ) { }
  slides:any[];
  slideOpts = {
    effect: 'flip',
    loop:true,
  };
  post:any;
  contests:any[];
  phone:string;
  whatsapp:string;
  ngOnInit(event=null) {
    this.slides=[
      {image:'assets/images/slider/1.jpg',title:'Slide 1'},
      {image:'assets/images/slider/2.jpg',title:'Slide 2'},
      {image:'assets/images/slider/3.jpg',title:'Slide 3'},
    ];
    this.contests=[
      {image:'assets/images/slider/1.jpg',name:'Ahmed Hussin Ahmed',age:30,talend:'Artist',city:'Egypt'},
      {image:'assets/images/slider/2.jpg',name:'Ali Ibraheem',age:25,talend:'Songer',city:'Saudi Arab'},
      {image:'assets/images/slider/3.jpg',name:'Ramadan Saied Mohammed',age:35,talend:'Football',city:'USA'},
    ];

    this.slider.startAutoplay();

    this.post={
      title:'Stories about our life',
      image:'/assets/images/slider/1.jpg',
      body:'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined '
    }
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
