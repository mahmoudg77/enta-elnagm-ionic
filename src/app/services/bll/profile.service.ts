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
  resendVerifyMail(next:any=null,error:any=null){
       this.api.postRequest("/profile/resendVerify",{},data=>{if(next)next(data);},err=>{if(error)error(err);});
   }
 
  uploadProfileImage(file,next:any=null,error:any=null){
    console.log(file);
    this.auth.getUser().then(user=>{
      var img= new ImageFile();
      img.file=file;
      img.id=user.id;
      img.model="App\\User";
      img.tag="img_user";
      img.filename="app_profile_image_"+user.id+".jpg";
      this.imgUploader.upload(img,data=>{if(next)next(data);},err=>{if(error)error(err);});
    }).catch(err=>{if(error)error(err);});
  }
  uploadIDImage(file,next:any=null,error:any=null){
    this.auth.getUser().then(user=>{
      var img= new ImageFile();
      img.file=file;
      img.id=user.id;
      img.model="App\\User";
      img.tag="img_id_no";
      img.filename="app_profile_image_"+user.id+".jpg";
      this.imgUploader.upload(img,data=>{if(next)next(data);},err=>{if(error)error(err);});
    }).catch(err=>{if(error)error(err);});
  }
}
