import { AlertService } from './alert.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

@NgModule({
  declarations: [
    ModalPage
  ],
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule
  ],
  providers:[
    AlertService

  ],
  entryComponents:[
    ModalPage
  ]
})
export class AlertModule { }
