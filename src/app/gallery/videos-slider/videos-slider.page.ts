import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PostService } from 'src/app/services/bll/articles.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-videos-slider',
  templateUrl: './videos-slider.page.html',
  styleUrls: ['./videos-slider.page.scss'],
})
export class VideosSliderPage implements OnInit {
  id:number=0;    
  video:any;
  constructor(
    private postService:PostService,
    private translate:TranslateService,
    public shared:SharedService,
    private domSanitizer: DomSanitizer,
    private route:ActivatedRoute
  ) { }
    ngOnInit() {
      this.route.params.subscribe(params=>{
        this.id=+params['id'];
    
      this.postService.getPostByID(this.id,next=>this.video=this.domSanitizer.bypassSecurityTrustResourceUrl(next.description));
    });
  }
  
}
