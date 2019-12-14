import { ProfilePage } from './profile/profile.page';
import { RegisterPage } from './../register/register.page';
import { AuthGuard } from './../services/auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAreaPage } from './user-area.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: UserAreaPage,
  // },
      {  path: '',
        pathMatch:'full',
        redirectTo:'profile'
},
     
  {
    path: 'profile',
    canActivate:[AuthGuard],
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'application',
    canActivate:[AuthGuard],
    loadChildren: () => import('./application/application.module').then( m => m.ApplicationPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations:[],
  exports: [RouterModule],
})
export class UserAreaPageRoutingModule {}
