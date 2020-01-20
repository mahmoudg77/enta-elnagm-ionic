import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertViewPage } from './alert-view.page';

const routes: Routes = [
  {
    path: '',
    component: AlertViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertViewPageRoutingModule {}
