import { ComponentsModule } from './../../components/components.module';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationPageRoutingModule } from './application-routing.module';

import { ApplicationPage } from './application.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [ApplicationPage],
  providers:[
    File,
    Media,
    MediaCapture,
    Chooser,
    WebView
  ]
})
export class ApplicationPageModule {}
