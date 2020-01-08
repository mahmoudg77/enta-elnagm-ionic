import { SharedService } from './services/shared.service';
import { Component, OnInit, Inject } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { DOCUMENT } from '@angular/common';
 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.translate.setDefaultLang("en");
    this.translate.currentLang="en";
    
    console.log(this.translate.getDefaultLang());
    this.platform.ready().then(next=>{
      this.getDeviceLanguage();
      
    });

  
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
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
