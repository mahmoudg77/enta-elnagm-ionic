import { AuthService } from './../auth/auth.service';
import { ImageUploaderService, ImageFile } from './../dal/image-uploader.service';
import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  progressValue: number=0;

  constructor(private api:CallapiService,
    private imgUploader:ImageUploaderService,
    private auth:AuthService

 ) { }


  getMyProfile(next:any=null,error:any=null){
    this.api.getRequest("/profile/me",{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
  getProfile(id,next:any=null,error:any=null){
    this.api.getRequest("/profile/"+id,{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
  uploadProfileImage(file,next:any=null,error:any=null){
    this.auth.getUser().then(user=>{
      var img= new ImageFile();
      img.file=file;
      img.id=user.id;
      img.model="App\\User";
      img.tag="img_user";
      this.imgUploader.upload(file,data=>{if(next)next(data);},err=>{if(error)error(err);});
    }).catch(err=>{if(error)error(err);});
  }
  uploadIDImage(file,next:any=null,error:any=null){
    this.auth.getUser().then(user=>{
      var img= new ImageFile();
      img.file=file;
      img.id=user.id;
      img.model="App\\User";
      img.tag="img_id_no";
      this.imgUploader.upload(file,data=>{if(next)next(data);},err=>{if(error)error(err);});
    }).catch(err=>{if(error)error(err);});
  }
}
