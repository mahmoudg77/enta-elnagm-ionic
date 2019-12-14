import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosSliderPage } from './photos-slider.page';

const routes: Routes = [
  {
    path: '',
    component: PhotosSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosSliderPageRoutingModule {}
