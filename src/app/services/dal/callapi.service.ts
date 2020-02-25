import { Platform } from '@ionic/angular';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { apiResult, apiError } from './api-result';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';
// import { AppVersion } from '@ionic-native/app-version/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../loading.service';


@Injectable()
export class CallapiService {
  version:string=environment.version;
  package:string;
  lang: string="en";
 
  constructor(
    public http:HttpClient,
    private shared:SharedService,
    private route:Router,
    //private crashlytic:FirebaseCrashlytics,
    // private appVersion:AppVersion,
    private platform:Platform,
    private translate:TranslateService,
    private load :LoadingService
    ) { 
      //this.crashlytic.initialise();
    //if(!this.platform.is('ios') && !this.platform.is('android')) return;
    // this.getVersion();
  }
  // getVersion(){
  //   this.appVersion.getVersionNumber().then((ver:string)=>{
  //     this.version=ver;
  //   });
  //   this.appVersion.getPackageName().then(id=>{
  //     this.package=id;
  //   })
  // }
  getToken() {
    let token=localStorage.getItem(environment.tokenKey) || null;
    if(token==null) return null;
    return token||null ;//Guid.isGuid(token)?token:null;
  }
   
  
  getRequest(url:string,pars:any,success_callbak:any,error_callback:any=null){
    this.lang=this.translate.currentLang;

    let parms=stringify(pars);
    let headers:HttpHeaders= new HttpHeaders({"X-APP-KEY":environment.apiKey});
    // this.getVersion();
    if(this.getToken()!=null ) headers=headers.append("X-TOKEN",this.getToken());
    
    // if(this.version!=null )  headers=headers.append("APP_VER",this.version);
    //console.log(environment.apiKey);
     this.http.get(environment.apiUrl + "/api/" + this.lang + url +(parms?"?":"")+parms,{headers})
     .pipe(map((result:apiResult)=>{return result}))
                      .subscribe(
                        next=>{
                          if (next.isSuccess) {
                                success_callbak(next.data);              
                              } else {
                                this.logException("GET " +url,headers,pars,next);
                                this.softErrorHandling({code:next.code,message:next.message});
                                if(error_callback!=undefined)  error_callback(next.message);
                            }
                          },
                          error=>{
                            this.logException("GET " +url,headers,pars,error);
                            if(error_callback!=undefined)  error_callback(error.statusText);
                            this.errorHandling(error);
                          }
                          );
  }
  
  postRequest(url:string,pars:any,success_callbak:any=null,error_callback:any=null){
    this.lang=this.translate.currentLang;

    let headers:HttpHeaders= new HttpHeaders({"X-APP-KEY":environment.apiKey});
    // this.getVersion();
    if(this.getToken()!=null ) headers=headers.append("X-TOKEN",this.getToken());
    // if(this.version!=null )  headers=headers.append("APP_VER",this.version);
    
    this.http.post(environment.apiUrl + "/api/" + this.lang + url ,pars,{headers:headers}).pipe(map((result:apiResult)=>{return result}))
            .subscribe(
              next=>{
                  if (next.isSuccess) {
                    if(success_callbak!=null)success_callbak(next.data);              
                  } else {
                    this.logException("POST " + url,headers,pars,next);
                    this.softErrorHandling({code:next.code,message:next.message});
                    if(error_callback!=null) error_callback({code:next.code,message:next.message});
                    
                  }
              },
              error=>{
                this.logException("POST " +url,headers,pars,error);
                //const err=JSON.parse(error.responseText);
                 
                if(error_callback!=null)  error_callback({code:error.status,message:error.statusText});
                this.errorHandling(error)
              }
            ) 
  }

 

    logException(url,headers:HttpHeaders,pars,error){
      var obj={
        Package:this.package,
        Ver:this.version,
        Url:url,
        Headers:headers.keys().map(key =>
          `${key}: ${headers.get(key)}`).join("<br/>"),
        Body:pars,
        Response:JSON.stringify(error)

      }
      
      // this.http.post(environment.apiUrl+"/Log/Error",obj).subscribe(
      //   next=>{

      //   },
      //   error=>{

      //   }
      // )
     
    }
    errorHandling(error:any){
      if(this.load.isLoading)this.load.dismiss();
      if(error.status==403){
        this.route.navigate(['/','login']);
      }else if(error.status==401){
        this.shared.redirectToError("You are not allowed to perform this action");
      }else if(error.status==500){
        //this.shared.error("There are problem in the server !!");
      }else if(error.status==502){
        //this.shared.error("Bad Gateway error !!");
      }else if(error.status==406){
        this.shared.redirectToError("This option is disbaled now !!");
      }else if(error.status==422){
        console.log(error);
        const validations=error.error;
        var msg="";
        Object.keys(validations).forEach(element => {
          msg+=(msg==""?"":"<br/>") + validations[element][0];
        });
        this.shared.error(msg);
      }else{
        //this.shared.error(error.message);
      }
    }
    softErrorHandling(error:any){
      if(this.load.isLoading)this.load.dismiss();
      if(error.code==403){
        this.route.navigate(['/','login']);
      }else if(error.code==401){
        this.shared.redirectToError(error.message);
      }else{
        this.shared.error(error.message);
      }
    }

     
    
    
}


export class imageData{
  file:File;
  model:string;
  id:number;
  tag?:string="main";
  constructor(_file:File,_model:string,_id:number,private call:CallapiService,_tag:string="main"){
    this.file=_file;
    this.model=_model;
    this.id=_id;
    this.tag=_tag;
  }
 
  upload(success_callbak:any,error_callback:any=null){
    const uploadData = new FormData();
   //console.log(this.file);
    uploadData.append('img', this.file, this.file.name);

    this.call.postRequest("/img/upload?model="+this.model+"&model_id="+this.id+"&model_tag="+this.tag,uploadData,
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
  
}