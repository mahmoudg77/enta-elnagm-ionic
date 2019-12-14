import { Injectable } from '@angular/core';
import { CallapiService } from './callapi.service';

export class ImageFile{
  file:File;
  model:string;
  id:number;
  tag?:string="main";
}
@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {

  constructor(private  call:CallapiService){
  
  }

  upload(img:ImageFile,success_callbak:any,error_callback:any=null){
    const uploadData = new FormData();
   //console.log(this.file);
    uploadData.append('img', img.file,img.file.name);

    this.call.postRequest("/Image/Upload?model="+img.model+"&model_id="+img.id+"&model_tag="+img.tag,uploadData,
      res=>{
        if(success_callbak){
          success_callbak(res);
        }
      },
      error=>{
        if(error_callback){
          error_callback(error);
        }
      }
    )
  }
  
  isImageFile(file){      
    let acceptedImageTypes = {'image/png': true,'image/jpeg': true,'image/gif': true};
      if (acceptedImageTypes[file.type] !== true){
          return false;	
      }
      else if (file.size>1024*1024){
          return false;	
      } 
        return true;   
      }//checkfiles
  
}
