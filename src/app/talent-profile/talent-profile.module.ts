import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TalentProfilePageRoutingModule } from './talent-profile-routing.module';

import { TalentProfilePage } from './talent-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalentProfilePageRoutingModule
  ],
  declarations: [TalentProfilePage]
})
export class TalentProfilePageModule {}
