import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from 'src/app/services/bll/profile.service';
import { TalentService } from 'src/app/services/bll/talent.service';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MediaCapture, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';
import { Chooser } from '@ionic-native/chooser/ngx';
import { HttpEventType } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';

export class FileObject{
  name:string;
  playPath:string;
  dataPath:string;
  data?:Blob=null;
}
const MEDIA_FILES_KEY="StorageFiles";
const videos=[ 
  // "video/x-flv",
  "video/mp4",
  // "application/x-mpegURL",
  // "video/MP2T",
  "video/3gpp",
  // "video/quicktime",
  // "video/x-msvideo",
  // "video/x-ms-wmv",
  // "video/avi",
  "video/webm",
];
const audios=[
// "audio/basic",
// "auido/L24",
// "audio/mid",
// "audio/mid",
"audio/mpeg",
// "audio/mp4",
// "audio/x-aiff",
// "audio/x-aiff",
// "audio/x-aiff",
// "audio/x-mpegurl",
// "audio/vnd.rn-realaudio",
// "audio/vnd.rn-realaudio",
"audio/ogg",
// "audio/vorbis",
"audio/vnd.wav",
"audio/opus",
];
@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})

export class ApplicationPage implements OnInit {
  data: any={user:{photo:{md:'assets/images/profile-photo.jpg'}}};
  status:any={};
  attach: FileObject=new FileObject();
  progressValue=0;
  submitted:boolean=false;
  filepath:string;
  filetype:string;
  @ViewChild('videoplayer',{static:false}) videoPlayer: ElementRef;
  // @ViewChild('fileinput',{static:false}) fileinput: any;
  mediaFile: any;
  constructor(
    private profile:ProfileService,
    public talent:TalentService,
    private shared:SharedService,
    private auth:AuthService,
    private router:Router,
    private mediaCapture:MediaCapture,
    private storage: Storage, 
    private file: File, 
    private media: Media,
    private actionSheetController:ActionSheetController,
    private chooser:Chooser,
    private webview:WebView
    ) { }

  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    this.profile.getMyProfile(data=>{
      this.data=data;
      this.talent.getMyStatus(next=>{
        this.status=next;
      })
      //if(this.data.user.talent_file!=null)this.video=this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.user.talent_file);
    }
  );
  }
  onSubmit(){
    this.submitted=true;

    this.talent.upload(this.attach.data).subscribe(next=>{
    this.submitted=false;
    this.shared.redirectToSuccess("Your file uploadded successfully","/user-area/application")
   });
  }
 
  isVideoAudioFile(file){   
   
  
      // if (videos.includes(file.type) || audios.includes(file.type)){
      //     return true;	
      // }
      return this.shared.matchInArray(file.type,videos.concat(audios));
     // return false
      
   }//
  isAudioFile(file){   
   
  
      if ( audios.includes(file.type)){
          return true;	
      }
      return false
      
   }//
  isVideoFile(file){   
   
  
      if (videos.includes(file.type)){
          return true;	
      }
      return false
      
   }//

      checkFileSize(file){
          if (file.size>1024*1024*25){
              return false;	
          } 
        return true;   
      }

      async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
          header: 'Upload',
          buttons: [{
            text: 'Video Recorder',
            icon: 'videocam',
            handler: () => {
              this.captureVideo();
            }
          }, {
            text: 'Voice Recorder',
            icon: 'microphone',
            handler: () => {
              this.captureAudio();
            }
          }, {
            text: 'From file',
            icon: 'folder',
            handler: () => {
              this.chosser();
              // this.fileinput.nativeElement.trigger('click')
            }
      
          }, {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              //console.log('Cancel clicked');
            }
          }]
        });
        await actionSheet.present();
      }
  chosser() {

    this.chooser.getFile(videos.concat(audios).join(","))
    .then((file) =>{
    //   //console.log(file ? file.name : 'canceled');
    //  this.storeMediaFiles(file);
    //  this.fileinput.nativeElement.value=file;
    //  this.file.resolveLocalFilesystemUrl(file.uri).then(path=>{

    //    //console.log(path);
    //  })
    //  //console.log("Chosser:",file);
    //   this.readFile(file)
    //   this.attach=file;
      //console.log(file);
      this.attach={name:file.name,playPath:file.dataURI,dataPath:""};
      this.play(this.attach);
      this.readChoosedFile(file);

  })
    .catch((error: any) => console.error(error));
  }

      

  onFileChange(event){
            
    if(!this.isVideoAudioFile(event.target.files[0])){
      this.shared.error("Not supported file type.");
        return;
    }
    if(!this.checkFileSize(event.target.files[0])){
      this.shared.error("File size must be less than 25MB.");
      return;
    }
    
    //console.log("onFileCganged",event.target);
    // const reader = new FileReader();
    // //  reader.onload =  (e) =>{
    // //     //   this.imageDrop.nativeElement.innerHTML="";		        
    // //     let fileReader = e.target as FileReader;
    // //      event.target.parentNode.style.backgroundImage='url('+fileReader.result+')';
        
    // // };
    // //console.log(event.target.files[0]);
    
    // reader.readAsDataURL(event.target.files[0]);   
    
    this.attach=event.target.files[0];
    //this.storeMediaFiles(event.target.files[0])
}

readCaptuerdFile(selectedfile:any) {
  //console.log("readCaptuerdFile",selectedfile);

  this.file.resolveLocalFilesystemUrl(selectedfile.fullPath)
  .then((entry) => { 
      (<any>entry).file(file =>
        {
          //console.log(file);
          const reader = new FileReader();
           reader.onload = () => {
              this.attach.data = new Blob([reader.result], {
                  type: selectedfile.type
              });
              //console.log('ready for upload');
             };
            reader.readAsArrayBuffer(file);
            
          });
           
  })
  .catch(err => {
    console.error("readChoosedFile",err);
  });
  // const reader = new FileReader();
  //   reader.onload = () => {
  //        this.attach.data = new Blob([reader.result], {
  //           type: file.type
            
  //       });
  //       console.log(file.type);
  //     };
  //     reader.readAsArrayBuffer(file);
 
    
}

readChoosedFile(selectedfile:any) {
  //console.log("readChoosedFile",selectedfile);
   this.file.resolveLocalFilesystemUrl(selectedfile.uri)
        .then((entry) => { 
            (<any>entry).file(file =>
              {
                //console.log(file);
                const reader = new FileReader();
                 reader.onload = () => {
                    this.attach.data = new Blob([reader.result], {
                        type: selectedfile.mediaType
                    });
                    //console.log('ready for upload');
                   };
                  reader.readAsArrayBuffer(file);
                  
                });
                 
        })
        .catch(err => {
          console.error("readChoosedFile",err);
        });
  
}

logout(){
  this.auth.logout(next=>this.router.navigateByUrl("/home"),error=>this.router.navigateByUrl("/home"));
}

captureAudio() {
  let options: CaptureAudioOptions = {
    limit: 1,
    duration: 5*60,
   
  }
  this.mediaCapture.captureAudio().then(res => {
    // this.storeMediaFiles(res[0]);
    //this.fileinput.nativeElement.value=res[0].fullPath.replace(/^file:\/\//, '');
    this.attach={name:res[0].name,playPath:this.webview.convertFileSrc(res[0].fullPath),dataPath:""};

    this.play(this.attach);
    this.readCaptuerdFile(res[0]);
    //this.onSubmit();
  }, 
  (err) => console.error(err));
}

captureVideo() {
  let options: CaptureVideoOptions = {
    limit: 1,
    duration: 3*60,
    quality:0
  }
  this.mediaCapture.captureVideo(options).then(res=> {
    // let capturedFile = res[0];
    // let fileName = capturedFile.name;
    // let dir = capturedFile['localURL'].split('/');
    // dir.pop();
    // let fromDirectory = dir.join('/');      
    // var toDirectory = this.file.dataDirectory;
    
    // this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
      // this.storeMediaFiles(res[0]);
    // },err => {
    //   //console.log('err: ', err);
    // });
    //this.fileinput.nativeElement.files=res[0];
    this.attach={name:res[0].name,playPath:this.webview.convertFileSrc(res[0].fullPath),dataPath:""};

    this.play(this.attach);
    this.readCaptuerdFile(res[0]);
     //this.play(res[0])
    //this.onSubmit();
  },
  (err) => console.error(err));
}

play(myFile:FileObject) {
  // if (this.isAudioFile(myFile)) {
  //   const audioFile = this.media.create(myFile.localURL);

  //   //console.log("audio:",audioFile);
  //   audioFile.play();
  // } 
  // if (this.isVideoFile(myFile)) {
    //let path = this.file.dataDirectory + myFile.name;
    //let path = myFile.;
    //let url = path.replace(/^file:\/\//, '');
    //console.log("video:",myFile);
    let video = this.videoPlayer.nativeElement;
     video.src = myFile.playPath;
    video.load();
    video.play();

  // }
  //this.myvideo.src= myFile.fullPath;
}

// storeMediaFiles(file) {
//   // this.storage.set(MEDIA_FILES_KEY, JSON.stringify(file));   
//     // this.play(file);
//     this.attach=file.data;
//     //console.log(this.attach);
//     // this.fileinput.value=file.fullPath;
//     // this.fileinput.files=[file.fullPath];
// }
// storeMediaFiles(files) {
//   this.storage.get(MEDIA_FILES_KEY).then(res => {
//     if (res) {
//       let arr = JSON.parse(res);
//       arr = arr.concat(files);
//       this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
//     } else {                                      
//       this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
//     }
//     this.mediaFile = res;
//   })
// }


}
