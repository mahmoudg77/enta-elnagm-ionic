import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private api:CallapiService) { }


  getPosts($type,$query={},next:any=null,error:any=null){
    //$limit='10',$offset='0',$order='id,desc'
    this.api.getRequest("/posttype/"+$type+"/posts",$query,data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getBySlug($slug,next:any=null,error:any=null){
    this.api.getRequest("/post/"+$slug,{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getPostByID($id,next:any=null,error:any=null){
    this.api.getRequest("/post/"+$id,{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
  getPostsByCat($cat,$query={},next:any=null,error:any=null){
    this.api.getRequest("/category/"+$cat+"/posts",$query,data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
}
