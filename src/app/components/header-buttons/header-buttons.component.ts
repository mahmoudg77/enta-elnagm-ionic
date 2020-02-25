import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from './../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
// import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss'],
})
export class HeaderButtonsComponent implements OnInit {

  constructor(private actionSheet:ActionSheetController,
              private router:Router,
              private auth:AuthService,
              private shared:SharedService,
              // private iab: InAppBrowser,
              private translate:TranslateService
              ) { }

  ngOnInit() {}
  
 async viewButtons(){

   var transs:any={};
  await this.translate.get(['Login','Logout','Alt_Language']).subscribe(next=>transs=next);

   var btns:any[]=[];

   if(!this.auth.isLogin())
   btns.push( {
    text:transs.Login,
    icon:"log-in",
    handler:()=>{
      this.router.navigateByUrl("/login");
    },
    
  });
  if(this.auth.isLogin())
   btns.push(  {
    text:transs.Logout,
    icon:"log-out",
    handler:()=>{
      this.auth.logout(next=>this.router.navigateByUrl("/home"))
    },
  });

   btns.push(  {
    text:transs.Alt_Language,
    icon:"planet",
    handler:()=>{
      this.shared.getSelectedLanguage().then(lang=>{
        const newLang=lang=="en"?"ar":"en";
        this.shared.setSelectedLanguage(newLang).then(()=>window.location.reload())//this.router.navigateByUrl(this.router.url)
      });
    },
  });


  const actionSheet = await this.actionSheet.create({
    buttons: btns
  });
  await actionSheet.present();
  }

//   options : InAppBrowserOptions = {
//     location : 'yes',//Or 'no' 
//     hidden : 'no', //Or  'yes'
//     clearcache : 'yes',
//     clearsessioncache : 'yes',
//     zoom : 'yes',//Android only ,shows browser zoom controls 
//     hardwareback : 'yes',
//     mediaPlaybackRequiresUserAction : 'no',
//     shouldPauseOnSuspend : 'no', //Android only 
//     closebuttoncaption : 'Close', //iOS only
//     disallowoverscroll : 'no', //iOS only 
//     toolbar : 'yes', //iOS only 
//     enableViewportScale : 'no', //iOS only 
//     allowInlineMediaPlayback : 'no',//iOS only 
//     presentationstyle : 'pagesheet',//iOS only 
//     fullscreen : 'yes',//Windows only    
// };

  openUrlInApp(url:string){
    let target = "_self";
    // const browser = this.iab.create(url,target,this.options);

    // // browser.executeScript(...);

    // // browser.insertCSS(...);
    // browser.on('loadstop').subscribe(event => {
    //   // browser.insertCSS({ code: "body{color: red;}" });
    // });
    window.open(url,target);
    //browser.close();
  }
}
