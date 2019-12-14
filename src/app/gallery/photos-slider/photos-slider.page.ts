import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photos-slider',
  templateUrl: './photos-slider.page.html',
  styleUrls: ['./photos-slider.page.scss'],
})
export class PhotosSliderPage implements OnInit {
  gallery:any[]=[];
  index:number=0;

  @ViewChild(IonSlides,{static:false}) slider:IonSlides;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    for (let index = 300; index < 330; index++) {
      this.gallery.push("https://picsum.photos/id/"+index+"/200/200");
    }

    this.route.params.subscribe(params=>{
      this.index=+params['index'];
    })
  }
  
  ngAfterViewInit(){
    this.slider.slideTo(this.index);

  }

}
