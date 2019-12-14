import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideosSliderPageRoutingModule } from './videos-slider-routing.module';

import { VideosSliderPage } from './videos-slider.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideosSliderPageRoutingModule,
    TranslateModule
  ],
  declarations: [VideosSliderPage]
})
export class VideosSliderPageModule {}
