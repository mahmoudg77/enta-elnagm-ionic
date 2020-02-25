import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PostService } from 'src/app/services/bll/articles.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
import { LoadingService } from 'src/app/services/loading.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';


@Component({
  selector: 'app-videos-slider',
  templateUrl: './videos-slider.page.html',
  styleUrls: ['./videos-slider.page.scss'],
})
export class VideosSliderPage implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.video=null;
  }
  id:number=0;    
  video:any;
  constructor(
    private postService:PostService,
    private translate:TranslateService,
    public shared:SharedService,
    private domSanitizer: DomSanitizer,
    private route:ActivatedRoute,
    private load:LoadingService,
    private youtube:YoutubeVideoPlayer
  ) { }
  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
      this.load.present();
      this.route.params.subscribe(params=>{
        this.id=+params['id'];
        
      this.postService.getPostByID(this.id,
          next=>{
            //this.video=this.domSanitizer.bypassSecurityTrustResourceUrl(next.description);
         var vid=(<string>next.description).split("?")[0].split("/").pop();
            this.youtube.openVideo(vid);
            this.load.dismiss();
          },err=>{
            this.load.dismiss();
          });
      });
  }

  
  
}
