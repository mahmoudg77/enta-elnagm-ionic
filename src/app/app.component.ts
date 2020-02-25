import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from './services/shared.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { Platform, AlertController, IonSlides } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
declare var require: any
// declare var DOCUMENT : any 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
 
 async ngOnInit(){
    // this.translate.onLangChange.subscribe(async lang=>{
    //   console.log("lang",lang);
    // await  this.shared.setSelectedLanguage(lang);
    // });
    this.translate.setDefaultLang("ar");
    this.translate.currentLang="ar";
    
    this.platform.ready().then(async next=>{
      await this.getDeviceLanguage();
    });
  this.platform.backButton.subscribe(async (next) => {
    //  console.log(this.router.url);
     if (this.router.url == "/home") {
       await this.showExitDialog();
     }
     else if (['/user-area/profile', '/user-area/application', '/gallery/photos', '/gallery/vidoes', '/news', '/about', '/login', '/register'].indexOf(this.router.url.split("?")[0]) > -1) {
       this.router.navigateByUrl("/home");
     }
   });

  //  this.translate.onLangChange.subscribe(lang=>{

  //  });
  }

 async getDeviceLanguage() {
  await  this.shared.getSelectedLanguage().then(async next=>{
      if((next||"")==""){

        const res={value:"ar-EG"};
        
        //this.globalization.getPreferredLanguage().then(res => {
          const lang=res.value.split("-")[0];
         await this.shared.setSelectedLanguage(lang).then(()=>{});
        await  this.translate.get('dir').subscribe(
            v=>{
              this.doc.dir=v;

              this.shared.isRTL=v=='rtl';
              if(this.shared.isRTL) {
                require("style-loader!./../theme/bootstrap-rtl.min.scss");
              }
            }
            );

          this.translate.setDefaultLang(lang);
          this.translate.currentLang=lang;
          this.doc.lang=lang;
          // Run other functions after getting device default lang
          // })
          // .catch(e => console.log(e));
        }else{
          this.translate.setDefaultLang(next);
          this.translate.currentLang=next;
          this.doc.lang=next;

          // Run other functions after getting device default lang
        await   this.translate.get('dir').subscribe(
            v=>{
              this.doc.dir=v;
             
              this.shared.isRTL=v=='rtl';
              if(this.shared.isRTL) {
                require("style-loader!./../theme/bootstrap-rtl.min.scss");
              }
            }
            );
        }
        });
      }
  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private globalization: Globalization,
    @Inject(DOCUMENT) public doc,
    private shared :SharedService,
    private router:Router,
    private fcm:FCM,
    private auth:AuthService,
    private dialogs:AlertController,

  ) {
    this.initializeApp();
    
  }

  async showExitDialog(){
    var trns:any;
    await this.translate.get(['btn_yes','btn_no','dialog_exit_title','dialog_exit_message']).subscribe(next=>{
      trns=next;
    })
    const alert=await  this.dialogs.create({
      header: trns.dialog_exit_title,
      //subHeader: 'Subtitle',
      message:trns.dialog_exit_message,
      buttons: [
        {
          text:trns.btn_no ,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          }
        }, {
          text: trns.btn_yes,
          cssClass: 'prinmary',
          handler: () => {
            navigator['app'].exitApp();
          }
          
        }
      ]
      
     });
   
     await alert.present();
    }
  initializeApp() {
    this.platform.ready().then(() => {
    //this.statusBar.overlaysWebView(false);
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#8d30f0'); 
      // this.statusBar.styleBlackTranslucent(); 
      // this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.onTokenRefresh().subscribe(token=>this.auth.saveNewDeviceID(token));
      this.fcm.getToken().then(token=>this.auth.saveNewDeviceID(token));
    });
  }

  logout(){
    this.auth.logout(next=>this.router.navigateByUrl("/home"),error=>this.router.navigateByUrl("/home"));
  }
  
}
