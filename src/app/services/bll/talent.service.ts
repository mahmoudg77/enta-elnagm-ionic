import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  constructor(private api:CallapiService) { }


  getAll(next:any=null,error:any=null){
    this.api.getRequest("/talent",{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
  getMyStatus(next:any=null,error:any=null){
    this.api.postRequest("/talent/status",{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
  upload(file,next:any=null,error:any=null){
    const uploadData = new FormData();
    uploadData.append('attach',file);
    this.api.postRequest("/talent/upload",uploadData,
      res=>{
        if(next){
          next(res);
        }
      },
      err=>{
        if(error){
          error(err);
        }
      });
  }
}
