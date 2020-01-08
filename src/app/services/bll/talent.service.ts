import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TalentService {

  constructor(private api:CallapiService) { }


  getAll(next:any=null,error:any=null){
    //$limit='10',$offset='0',$order='id,desc'
    this.api.getRequest("/talent",{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
}
