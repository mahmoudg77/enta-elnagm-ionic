import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotosSliderPageRoutingModule } from './photos-slider-routing.module';

import { PhotosSliderPage } from './photos-slider.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosSliderPageRoutingModule,
    TranslateModule
  ],
  declarations: [PhotosSliderPage]
})
export class PhotosSliderPageModule {}
