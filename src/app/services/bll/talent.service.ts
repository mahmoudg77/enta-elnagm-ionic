import { apiResult } from './../dal/api-result';
import { map, tap, last } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { environment } from './../../../environments/environment';
import { HttpHeaders, HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CallapiService } from './../dal/callapi.service';
import { Injectable } from '@angular/core';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})

export class TalentService {
progressValue=0;
  constructor(private api:CallapiService,
    private translate:TranslateService,
    private auth:AuthService,
    private http:HttpClient,
    // private transfer: FileTransfer,
    //  private file: File
    ) { }


  getAll(next:any=null,error:any=null){
    this.api.getRequest("/talent",{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
  getMyStatus(next:any=null,error:any=null){
    this.api.postRequest("/talent/status",{},data=>{if(next)next(data);},err=>{if(error)error(err);});
  }
 
  upload(file){
    const uploadData = new FormData();
    uploadData.append('attach',file);

    const lang=this.translate.currentLang;

    let headers:HttpHeaders= new HttpHeaders({"X-APP-KEY":environment.apiKey});

    if(this.auth.getToken()!=null ) headers=headers.append("X-TOKEN",this.auth.getToken());
    // if(this.version!=null )  headers=headers.append("APP_VER",this.version); //responseType:'arraybuffer',
    var req=new HttpRequest("POST",environment.apiUrl + "/api/" + lang + "/talent/upload" ,uploadData,{headers:headers,reportProgress: true})
    return this.http.request(req)
                    .pipe(
                        map(event => this.getStatusMessage(event)),
                        tap(message => console.error(message)),
                        last()
                      );
      // .subscribe(event => console.log(this.getStatusMessage(event)));
  }

  // upload(file,next=null,error=null){
    
  //   console.log(file);
  //   const lang=this.translate.currentLang;

  //   var headers:HttpHeaders= new HttpHeaders({"X-APP-KEY":environment.apiKey});

  //   if(this.auth.getToken()!=null ) headers=headers.append("X-TOKEN",this.auth.getToken());
  //   // if(this.version!=null )  headers=headers.append("APP_VER",this.version);
    

  //   var uri = encodeURI(environment.apiUrl + "/api/" + lang + "/talent/upload" );

  //   const fileTransfer: FileTransferObject = this.transfer.create();

  //   let options: FileUploadOptions = {
  //     fileKey: 'attach',
  //     fileName: file.name,//file.substr(file.lastIndexOf('/')+1),
  //     // mimeType:file.type,
  //     headers: headers
      
  //  }
  //  this.file.resolveLocalFilesystemUrl(file.uri).then(path=>{
  //    console.log("toUrl()",path.toURL());
  //   fileTransfer.upload(path.toURL(), uri, options).then(success=>{
  //     console.log("upload success",success);
  //     if( next!=null) next(success);
  //    }).catch( err=>{
  //      console.error("upload error",err);
  //     if(error!=null)error(err);
  //   });

  //  })
  
  //  fileTransfer.onProgress(progressEvent=> {
  //         // if (progressEvent.lengthComputable) {
  //         //     loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
  //         // } else {
  //         //     loadingStatus.increment();
  //         // }
  //         this.getStatusMessage(progressEvent);
  //     });

    
  // }
  getStatusMessage(event){
    console.log(event);
     let status;
    // status = Math.round(100 * event.loaded / event.total);
    // this.progressValue=status;

    switch(event.type){
      case HttpEventType.Sent:
        return `Uploading Files`;
      
      case HttpEventType.UploadProgress:
        status = Math.round(100 * event.loaded / event.total);
        this.progressValue=status;
        return `Files are ${status}% uploaded`;

      case HttpEventType.DownloadProgress:
        status = Math.round(100 * event.loaded / event.total);
        this.progressValue=status;
        return `Files are ${status}% downloaded`; 

      case HttpEventType.Response:
        this.progressValue=100;
        return `Done`;

      default:
        this.progressValue=100;
        return `Something went wrong`
    }
  }
}
