import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(private api:CallapiService) { }


  getCountries(next:any=null,error:any=null){
    this.api.getRequest("/Lookup/Countries","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getCities(country_id:number,next:any=null,error:any=null){
    this.api.getRequest("/Lookup/Cities/"+ country_id,"",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getDeviceTypes(next:any=null,error:any=null){
    this.api.getRequest("/Lookup/DeviceTypes","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getMarks(next:any=null,error:any=null){
    this.api.getRequest("/Lookup/Marks","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }

  getMyDevices(next:any=null,error:any=null){
    this.api.getRequest("/Lookup/MyDevices","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getFollowStates(next:any=null,error:any=null){
    this.api.getRequest("/Lookup/FollowStates","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getOrderStates(next:any=null,error:any=null){
    this.api.getRequest("/Lookup/OrderStates","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getOrderSures(next:any=null,error:any=null){
    this.api.getRequest("/Lookup/OrderSures","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
}
