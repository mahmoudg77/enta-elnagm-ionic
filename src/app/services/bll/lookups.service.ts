import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(private api:CallapiService) { }


  getCountries(next:any=null,error:any=null){
    this.api.getRequest("/lookup/countries","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getCities(country_id:number,next:any=null,error:any=null){
    this.api.getRequest("/countries/"+ country_id+"/cities","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getCategories(next:any=null,error:any=null){
    this.api.getRequest("/category/","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getChields(id,next:any=null,error:any=null){
    this.api.getRequest("/category/"+id+"/chields","",data=>{if(next)next(data);},err=>{if(error)error(err);});
  }

  
}
