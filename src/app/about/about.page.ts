import { AppVersion } from '@ionic-native/app-version/ngx';
import { Component, OnInit } from '@angular/core';
import { Market } from '@ionic-native/market/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  version: string;
  id: string;

  constructor(
    private appVersion:AppVersion,
    private market:Market
    ) {
    appVersion.getVersionNumber().then((ver:string)=>{
      this.version=ver;
    })
    appVersion.getPackageName().then(id=>{
      this.id=id;
    })
   }
   ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {}
  onRateApp(){
    this.market.open(this.id);
    // window.open('market://details?id=com.webegy.aldawlia', '_system', 'location=yes');
  }
}
