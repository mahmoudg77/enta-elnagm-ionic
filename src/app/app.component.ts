import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from './services/shared.service';
import { Component, OnInit, Inject } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    this.translate.setDefaultLang("en");
    this.translate.currentLang="en";
    
     this.platform.ready().then(next=>{
      this.getDeviceLanguage();
      
    });

    this.platform.backButton.subscribe(next=>{
      if(this.router.url=="/home"){
        navigator['app'].exitApp();
      }else{
        return false;
      }
    })
  }
  getDeviceLanguage() {
    this.globalization.getPreferredLanguage().then(res => {
      console.log(res);
      this.translate.setDefaultLang(res.value.split("-")[0]);
      this.translate.currentLang=res.value.split("-")[0];
        // Run other functions after getting device default lang
        this.translate.get('dir').subscribe(
            v=>{
              this.doc.dir=v;
              this.shared.isRTL=v=='rtl';
            }
          );
        })
        .catch(e => console.log(e));
        }
  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private globalization: Globalization,
    @Inject(DOCUMENT) private doc,
    private shared :SharedService,
    private router:Router,
    private fcm:FCM,
    private auth:AuthService
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
    //this.statusBar.overlaysWebView(false);
      // set status bar to white
      //this.statusBar.backgroundColorByHexString('#ffffff'); 
      this.statusBar.styleBlackTranslucent(); 
      // this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.onTokenRefresh().subscribe(token=>{
        this.auth.saveNewDeviceID(token);
      });
    });
  }

}
