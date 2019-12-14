import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videos-slider',
  templateUrl: './videos-slider.page.html',
  styleUrls: ['./videos-slider.page.scss'],
})
export class VideosSliderPage implements OnInit {
  gallery:any[]=[];
  index:number=0;    

  @ViewChild(IonSlides,{static:false}) slider:IonSlides;

  constructor(private route:ActivatedRoute,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    for (let index = 474; index < 500; index++) {
      this.gallery.push(this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/DjoSV66aPtk"));
    }
    this.route.params.subscribe(params=>{
      this.index=+params['index'];
    })

  }
  ngAfterViewInit(){
    this.slider.slideTo(this.index);
  }
}
