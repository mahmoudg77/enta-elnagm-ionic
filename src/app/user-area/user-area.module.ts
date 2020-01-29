import { ApplicationPageModule } from './application/application.module';
import { ProfilePageModule } from './profile/profile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAreaPageRoutingModule } from './user-area-routing.module';

import { UserAreaPage } from './user-area.page';
import { TranslateModule } from '@ngx-translate/core';
 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAreaPageRoutingModule,
    ProfilePageModule,
    ApplicationPageModule,
    TranslateModule
  ],
  declarations: [UserAreaPage],
  providers:[
    
  ]
})
export class UserAreaPageModule {}
