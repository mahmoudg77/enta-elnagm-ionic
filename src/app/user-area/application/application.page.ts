import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/bll/profile.service';
import { TalentService } from 'src/app/services/bll/talent.service';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {
  data: any={};
  status:any={};
  attach: any;
  constructor(private profile:ProfileService,private talent:TalentService,private shared:SharedService,private auth:AuthService,private router:Router) { }

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
    this.talent.upload(this.attach,next=>{
      this.shared.redirectToSuccess("Your file uploadded successfully","/user-area/application")
    })
  }

  isVideoAudioFile(file){   
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
      "video/webm"
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
  ];
  
      if (videos.includes(file.type) || audios.includes(file.type)){
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
  onFileChange(event){
            
    if(!this.isVideoAudioFile(event.target.files[0])){
      this.shared.error("Not supported file type.");
        return;
    }
    if(!this.checkFileSize(event.target.files[0])){
      this.shared.error("File size must be less than 25MB.");
      return;
    }
    
    const reader = new FileReader();
    let image = new Image();
    reader.onload =  (e) =>{
        //   this.imageDrop.nativeElement.innerHTML="";		        
        let fileReader = e.target as FileReader;
        image.src = fileReader.result.toString();
        image.width = 150; 
        
        event.target.parentNode.style.backgroundImage='url('+fileReader.result+')';
        
    };
    reader.readAsDataURL(event.target.files[0]);   
    
    this.attach=event.target.files[0];
}

logout(){
  this.auth.logout(next=>this.router.navigateByUrl("/home"),error=>this.router.navigateByUrl("/home"));
}

}
