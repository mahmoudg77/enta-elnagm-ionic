import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalentProfilePage } from './talent-profile.page';

const routes: Routes = [
  {
    path: ':id',
    component: TalentProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalentProfilePageRoutingModule {}
