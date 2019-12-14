import { Injectable } from '@angular/core';
import { CallapiService } from '../dal/callapi.service';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  public data={
    Opened:0,
    Closed:0,
    Total:0,
  }
  constructor(private api:CallapiService) { }

  getClientCounters(next:any=null,error:any=null){
    this.api.getRequest("/Counter/Client","",data=>{
      this.data=data;
      if(next)next(data);
    },err=>{if(error)error(err);});
  }
  getUserCounters(next:any=null,error:any=null){
    this.api.getRequest("/Counter/User","",data=>{
      this.data=data;
      if(next)next(data);
    },err=>{if(error)error(err);});
  }

}
