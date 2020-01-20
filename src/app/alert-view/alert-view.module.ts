import { ModalPage } from './../services/alert/modal/modal.page';
import { AlertService } from './../services/alert/alert.service';
import { AlertModule } from './../services/alert/alert.module';
import { AlertViewPage } from './alert-view.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertViewPageRoutingModule } from './alert-view-routing.module';

 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertViewPageRoutingModule,
  ],
  declarations: [AlertViewPage],
  
  
})
export class AlertViewPageModule {}
