import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingViewPage } from './loading-view.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingViewPageRoutingModule {}
