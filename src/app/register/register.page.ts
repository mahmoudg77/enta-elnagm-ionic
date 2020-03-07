import { FirebaseAuthService } from './../services/auth/firebase-auth.service';
import { AlertService } from './../services/alert/alert.service';
import { ImageFile } from './../services/dal/image-uploader.service';
import { AuthService } from './../services/auth/auth.service';
import { LookupsService } from './../services/bll/lookups.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImageUploaderService } from '../services/dal/image-uploader.service';
import { LoadingService } from '../services/loading.service';
import { ValidationService } from '../services/validation.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.form.reset();
    this.slider.slideTo(0);
  }
  form:FormGroup;
  categories: any[];
  countries: any[];
  cities: any[];
  @ViewChild(IonSlides,{static:false}) slider:IonSlides;
  IDImage: any;
  UserImage: any;
 sliderOptions={
  onlyExternal: false,

 }
  
  constructor(private formBuilder:FormBuilder,
    private lookup:LookupsService,
    private auth:AuthService,
    private router:Router,
    private imgUploader:ImageUploaderService,
    private load:LoadingService,
    private alert:AlertService,
    private formValidation:ValidationService,
    private fauth:FirebaseAuthService) { 
    this.form=this.formBuilder.group({
      // step1:this.formBuilder.group({
        name:['',[Validators.required,Validators.minLength(8)]],
        phone:['',[Validators.required,Validators.maxLength(15),Validators.minLength(10),Validators.pattern(/\d+/)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        password_confirmation:['',[Validators.required,formValidation.confirmValidator('password')]],
      // }),
      // step2:this.formBuilder.group({
        nationality:['',Validators.required],
        country:['',Validators.required],
        city_id:[''],
        address:['',Validators.required],
      // }),
      // step3:this.formBuilder.group({
        category_id:['',Validators.required],
        talent_des:['',Validators.required],
        img_user:[''],
        img_id_no:[''],
        birthdate:['',Validators.required],
      })
    // });
     
  }

  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    this.load.present()
    this.form.reset();
    this.slider.slideTo(0);
     this.lookup.getChields(21,next=>{
      this.categories=next;
      this.lookup.getCountries(next=>{
        this.countries=next;
        this.load.dismiss();
      },err=>{
        this.load.dismiss();
      })
    },err=>{
      this.load.dismiss();
    })
    
  }
   
  loginByFacebook(){
  //  this.auth.loginFirebaseFacebook().then(a=>{
  //    console.log(a);
  //  })
  this.fauth.login().then(next=>{
    console.log(next);
  })
  }
 async onSubmit(){

    this.load.present();
    var formdata=this.form.getRawValue();
    formdata.country=formdata.country?formdata.country.id:null;
    formdata.city_id=formdata.city_id?formdata.city_id.id:null;
    formdata.nationality=formdata.nationality?formdata.nationality.id:null;

    await this.auth.register(formdata,
    async next=>{
      if(this.IDImage){

        var img= new ImageFile();
        img.file=this.IDImage;
        img.id=next.user.id;
        img.model="App\\User";
        img.tag="img_id_no";
        img.filename="app_register_image_profile.jpg";
        
        await this.imgUploader.upload(img,async data=>{},err=>{
          this.load.dismiss();
          this.alert.error("ID Image",err.message);
        });
      
      }
      if(this.UserImage){
        var img1= new ImageFile();
        img1.file=this.UserImage;
        img1.id=next.user.id;
        img1.model="App\\User";
        img1.tag="img_user";
        img1.filename="app_register_image_profile.jpg";
        
        await  this.imgUploader.upload(img1,async data=>{},err=>{
          this.load.dismiss();
          this.alert.error("Profile Image",err.message);
        });
      }
     
          this.router.navigateByUrl("/user-area/profile");
          this.load.dismiss();
     
    },
    error=>{

      this.load.dismiss();
      //this.alert.error("Profile Image",error.message);

      // this.alert.error("Register",error.message);
    })
  }

  onCountryChange(event){
    this.lookup.getCities(event.value.id,
    next=>{
      this.cities=next;
    });
  }
  next(){
    
            this.slider.slideNext(1000);
          
  }
  back(){
    this.slider.slidePrev(1000);
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
      }//
  onIDImageChange(event){
            
            if(!this.isImageFile(event.target.files[0])){
                
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
            
            this.IDImage=event.target.files[0];
        }

        onUserImageChange(event){
            
          if(!this.isImageFile(event.target.files[0])){
              
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
          
          this.UserImage=event.target.files[0];
      }
}
