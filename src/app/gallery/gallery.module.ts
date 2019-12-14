import { VideosSliderPageModule } from './videos-slider/videos-slider.module';
import { PhotosSliderPageModule } from './photos-slider/photos-slider.module';
import { PhotosComponent } from './photos/photos.component';
import { VideosComponent } from './videos/videos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GalleryPageRoutingModule } from './gallery-routing.module';
import { GalleryPage } from './gallery.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule,
    PhotosSliderPageModule,
    VideosSliderPageModule,
    TranslateModule
  ],
  declarations: [GalleryPage,VideosComponent,PhotosComponent]
})
export class GalleryPageModule {}
