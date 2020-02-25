import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideosSliderPageRoutingModule } from './videos-slider-routing.module';

import { VideosSliderPage } from './videos-slider.page';
import { TranslateModule } from '@ngx-translate/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideosSliderPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [VideosSliderPage],
  providers:[
    YoutubeVideoPlayer
  ]
})
export class VideosSliderPageModule {}
