import { AlertService } from './alert/alert.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  public alertViewObject:any;
  error(message: string){
      this.alert.error("Error",message);
     
  }
  success(message: string){
    
      this.alert.success("Success",message);
   
  
  }
  redirectToError(message: string,next="/home"){
    this.alertViewObject={
      title:"Error",
      message:message,
      icon:"close-circle",
          color:"red",
      next:next
    };
    this.router.navigateByUrl("/alert-view");
    
  }
  redirectToWarning(message: string,next="/home"){
    this.alertViewObject={
      title:"Warning",
      message:message,
      icon:"information-circle",
      color:"yellow",
      next:next
    };
    this.router.navigateByUrl("/alert-view");
    
  }
  redirectToSuccess(message: string,next="/home"){
    
        this.alertViewObject={
          title:"Success",
          message:message,
        
          icon:"checkmark-circle",
          color:"green",
    
          next:next
        };
      this.router.navigateByUrl("/alert-view");
   
  }
  public isRTL:boolean=false;
  constructor(private alert: AlertService,private router:Router) { }

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
