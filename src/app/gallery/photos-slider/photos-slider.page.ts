import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/bll/articles.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/services/loading.service';
 
@Component({
  selector: 'app-photos-slider',
  templateUrl: './photos-slider.page.html',
  styleUrls: ['./photos-slider.page.scss'],
})
export class PhotosSliderPage implements OnInit {
  gallery:any[]=[];
  index:number=0;

  @ViewChild(IonSlides,{static:false}) slider:IonSlides;
   lang: string="en";
  constructor(
    private postService:PostService,
    private translate:TranslateService,
    public shared:SharedService,
    private route:ActivatedRoute,
    private load:LoadingService
  ) { }
  public environment=environment;
  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    this.lang=this.translate.currentLang;
    this.load.present();
    this.postService.getPostsByCat('photos',{},next=>{
      this.gallery=next;
      this.route.params.subscribe(params=>{
        this.index=+params['index'];
        this.load.dismiss();
      });
    },err=>{
      this.load.dismiss();
    });

    // for (let index = 300; index < 330; index++) {
    //   this.gallery.push("https://picsum.photos/id/"+index+"/200/200");
    // }
  
    
  }
   
  ngAfterViewInit(){
    this.slider.slideTo(this.index);

  }
  next(){
    this.slider.slideNext();
  }
  prev(){
    this.slider.slidePrev();
  }

}
