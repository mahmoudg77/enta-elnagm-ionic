import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingViewPageRoutingModule } from './loading-view-routing.module';

import { LoadingViewPage } from './loading-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingViewPageRoutingModule
  ],
  declarations: [LoadingViewPage]
})
export class LoadingViewPageModule {}
