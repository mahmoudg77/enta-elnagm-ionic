import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert.service';
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
import { PostService } from './bll/articles.service';
import { ValidationService } from './validation.service';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { Facebook } from '@ionic-native/facebook/ngx';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlertModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
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
    AuthGuard,
    PostService,
    ValidationService,
    FileTransfer,
    File,
    Facebook,
  ]
})
export class MyservicesModule { }
