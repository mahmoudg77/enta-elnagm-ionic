import { SharedService } from 'src/app/services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { MediaCapture, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { ProfileService } from './../../services/bll/profile.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { File } from '@ionic-native/file/ngx';

export class FileObject{
  name:string;
  playPath:string;
  dataPath:string;
  data?:Blob=null;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  data:any={user:{photo:{md:'assets/images/profile-photo.jpg'}}};
  video:any;
  attach:FileObject= new FileObject();

  @ViewChild('personalPhoto',{static:false}) personalPhoto:ElementRef;

  constructor(private profile:ProfileService,
    private domSanitizer: DomSanitizer,
    private auth:AuthService,
    private router:Router,
    private mediaCapture:MediaCapture,
    private file: File, 
    private actionSheetController:ActionSheetController,
    private chooser:Chooser,
    private webview:WebView,
    private translate:TranslateService,
    private shared:SharedService

    ) { }

  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    
      this.profile.getMyProfile(data=>{
        console.log(data);
        this.data=data;
        if(this.data.user.talent_file!=null)this.video=this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.user.talent_file);
      }
    );
  }
   
  logout(){
    this.auth.logout(next=>this.router.navigateByUrl("/home"),error=>this.router.navigateByUrl("/home"));
  }
 
  async editImageClick() {
    var transs:any={};
    await this.translate.get(['Upload','Camera','From_file','Cancel']).subscribe(next=>transs=next);
  
  
    const actionSheet = await this.actionSheetController.create({
      header: transs.Upload,
      buttons: [{
        text: transs.Camera,
        icon: 'camera',
        handler: () => {
          this.capturePic();
        }
      }, {
        text: transs.From_file,
        icon: 'folder',
        handler: () => {
          this.chosser();
          // this.fileinput.nativeElement.trigger('click')
        }
  
      }, {
        text: transs.Cancel,
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  capturePic() {
    let options: CaptureImageOptions = {
      limit: 1,
    }
    this.mediaCapture.captureImage(options).then(res=>{
      this.attach={name:res[0].name,playPath:this.webview.convertFileSrc(res[0].fullPath),dataPath:""};

      this.readCaptuerdFile(res[0]);
    })
  }
  readCaptuerdFile(selectedfile: any) {
    console.log("readCaptuerdFile",selectedfile);
     this.personalPhoto.nativeElement.src=this.webview.convertFileSrc(selectedfile.fullPath);
  this.file.resolveLocalFilesystemUrl(selectedfile.fullPath)
  .then((entry) => { 
      (<any>entry).file(file =>
        {
          //console.log(file);
          const reader = new FileReader();
           reader.onload = async (e) => {
              this.attach.data = new Blob([reader.result], {
                  type: selectedfile.type
              });
                      // let fileReader = e.target as FileReader;
              //  this.personalPhoto.nativeElement.src=fileReader.result;
              // await this.shared.delay(3000)

              this.uploadPersonalPhoto();
             };
            reader.readAsArrayBuffer(file);
           
          });
           
  })
  .catch(err => {
    console.error("readChoosedFile",err);
  });
  }
  chosser() {

    this.chooser.getFile("images/*")
    .then((file) =>{
      
      this.attach={name:file.name,playPath:file.dataURI,dataPath:""};
      this.readChoosedFile(file);

    });
  }
  readChoosedFile(selectedfile:any) {

    // this.personalPhoto.nativeElement.src=fileReader.result;
    this.personalPhoto.nativeElement.src=selectedfile.dataURI;
  console.log("readChoosedFile",selectedfile);
   this.file.resolveLocalFilesystemUrl(selectedfile.uri)
        .then((entry) => { 
            (<any>entry).file(file =>
              {
                //console.log(file);
                const reader = new FileReader();
                 reader.onload = async (e) => {
                    this.attach.data = new Blob([reader.result], {
                        type: selectedfile.mediaType
                    });
                    //console.log('ready for upload');
                    // await this.shared.delay(3000)
                     this.uploadPersonalPhoto();
                   };
                  reader.readAsArrayBuffer(file);
                 
                });
                 
        })
        .catch(err => {
          console.error("readChoosedFile",err);
        });
  
}

uploadPersonalPhoto(){
  this.profile.uploadProfileImage(this.attach.data,next=>{
    console.log(next);
  },error=>{
    console.error(error);

  })
}

}
