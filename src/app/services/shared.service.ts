import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  error(message: string){
    alert(message);
  }
  success(message: string){
    alert(message);
  }
  public isRTL:boolean=false;
  constructor() { }

  async presentLoading() {
    const loadingController = document.querySelector('ion-loading-controller');
    await loadingController.componentOnReady();
  
    const loadingElement = await loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
    });
    return await loadingElement.present();
  }

  openUrl(url:string){
       window.open(url,"_self");
 
  }

}
