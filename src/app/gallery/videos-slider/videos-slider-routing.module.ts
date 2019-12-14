import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosSliderPage } from './videos-slider.page';

const routes: Routes = [
  {
    path: '',
    component: VideosSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosSliderPageRoutingModule {}
