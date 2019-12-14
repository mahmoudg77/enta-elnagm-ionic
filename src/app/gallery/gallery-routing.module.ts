import { VideosSliderPage } from './videos-slider/videos-slider.page';
import { PhotosSliderPage } from './photos-slider/photos-slider.page';
import { VideosComponent } from './videos/videos.component';
import { PhotosComponent } from './photos/photos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPage } from './gallery.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryPage,
    children:[
      {path:'',pathMatch:'full',redirectTo:'photos'},
      {path:'photos',component:PhotosComponent},
      {path:'vidoes',component:VideosComponent},
    ]
  },
  {path:'photos-slider/:index',component:PhotosSliderPage},
  {path:'videos-slider/:index',component:VideosSliderPage},
  // {
  //   path: 'photos-slider',
  //   loadChildren: () => import('./photos-slider/photos-slider.module').then( m => m.PhotosSliderPageModule)
  // },
  // {
  //   path: 'videos-slider',
  //   loadChildren: () => import('./videos-slider/videos-slider.module').then( m => m.VideosSliderPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryPageRoutingModule {}
