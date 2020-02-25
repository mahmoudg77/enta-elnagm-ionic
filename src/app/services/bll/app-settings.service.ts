import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  reset() {
    this._Settings=[];
  }
  private _Settings:any[]=[];
  constructor(private api:CallapiService) {

  }

   getSettings(key:string,defaultValue='',next:any=null,error:any=null){
    
    if(this._Settings.length==0){
      this.api.getRequest("/setting","",data=>{
        this._Settings=data;
        //console.log("NewSettings",this._Settings)
        if(this._Settings!=null){
          const setting= this._Settings.filter(a=>a.key==key);
          if(setting.length==0) {
          if(next)next(defaultValue);
          return ;
          }
          if(setting[0]==null) {
          if(next)next(defaultValue);
          return ;
          }
          if(next)next(setting[0].value); 
          return;
      }
        if(next)next(data);
      },err=>{if(error)error(err);});
      return;
    }
    //console.log("OldSettings",this._Settings)
    
       const setting= this._Settings.filter(a=>a.key==key);
       if(setting.length==0) {
        if(next)next(defaultValue);
        return ;
       }
       if(setting[0]==null) {
        if(next)next(defaultValue);
        return ;
       }
       if(next)next(setting[0].value); 
       return;
    
  }

}
