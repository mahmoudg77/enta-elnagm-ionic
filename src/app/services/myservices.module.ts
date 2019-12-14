import { AuthGuard } from './auth/auth.guard';
import { FCM } from '@ionic-native/fcm/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SharedService } from './shared.service';
import { LoadingService } from './loading.service';
import { ImageUploaderService } from './dal/image-uploader.service';
import { CallapiService } from './dal/callapi.service';
import { apiResult, dataLoaderResult } from './dal/api-result';
import { CounterService } from './bll/counter.service';
import { AppSettingsService } from './bll/app-settings.service';
import { AuthService } from './auth/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupsService } from './bll/lookups.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers:[
    AppVersion,
    FCM,
    apiResult,
    CallapiService,
    dataLoaderResult,
    ImageUploaderService,
    AuthService,
    AppSettingsService,
    CounterService,
    LookupsService,
    LoadingService,
    SharedService,
    AuthGuard
  ]
})
export class MyservicesModule { }
