import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private api:CallapiService) { }


  getMyProfile(next:any=null,error:any=null){
    this.api.getRequest("/profile/me",{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
  getProfile(id,next:any=null,error:any=null){
    this.api.getRequest("/profile/"+id,{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
}
