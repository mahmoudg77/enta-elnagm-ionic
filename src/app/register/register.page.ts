import { AlertService } from './../services/alert/alert.service';
import { ImageFile } from './../services/dal/image-uploader.service';
import { AuthService } from './../services/auth/auth.service';
import { LookupsService } from './../services/bll/lookups.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImageUploaderService } from '../services/dal/image-uploader.service';
import { LoadingService } from '../services/loading.service';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form:FormGroup;
  categories: any[];
  countries: any[];
  cities: any[];
  @ViewChild(IonSlides,{static:false}) slider:IonSlides;
  IDImage: any;
  UserImage: any;

  constructor(private formBuilder:FormBuilder,
    private lookup:LookupsService,
    private auth:AuthService,
    private router:Router,
    private imgUploader:ImageUploaderService,
    private load:LoadingService,
    private alert:AlertService,
    private formValidation:ValidationService) { 
    this.form=this.formBuilder.group({
      // step1:this.formBuilder.group({
        name:['',[Validators.required,Validators.minLength(8)]],
        phone:['',[Validators.required,Validators.maxLength(15),Validators.minLength(10)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        password_confirmation:['',[Validators.required,formValidation.confirmValidator('password')]],
      // }),
      // step2:this.formBuilder.group({
        nationality:['',Validators.required],
        country:['',Validators.required],
        city_id:['',Validators.required],
        address:['',Validators.required],
      // }),
      // step3:this.formBuilder.group({
        category_id:['',Validators.required],
        talent_des:[''],
        img_user:['',Validators.required],
        img_id_no:['',Validators.required],
        birthdate:['',Validators.required],
      })
    // });
  }

  ionViewWillEnter(){this._ngOnInit();}
  ngOnInit() {}
  _ngOnInit() {
    this.load.present()
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
   
  onSubmit(){
    this.load.present();
    this.auth.register(this.form.getRawValue(),
    next=>{

      var img= new ImageFile();
      img.file=this.IDImage;
      img.id=next.user.id;
      img.model="App\\User";
      img.tag="img_id_no";
      
      this.imgUploader.upload(img,data=>{
        var img= new ImageFile();
        img.file=this.UserImage;
        img.id=next.user.id;
        img.model="App\\User";
        img.tag="img_user";
        this.imgUploader.upload(img,data=>{
          this.router.navigateByUrl("/user-area/profile");
          this.load.dismiss();
        },err=>{
          this.load.dismiss();
          this.alert.error("Profile Image",err.message);
        });
        
      },err=>{
        this.load.dismiss();
        this.alert.error("ID Image",err.message);
      })
    },
    error=>{
      this.load.dismiss();
      this.alert.error("Register",error.message);
    })
  }

  onCountryChange(){
    this.lookup.getCities(this.form.get('country').value,
    next=>{
      this.cities=next;
    });
  }
  next(){
    this.slider.slideNext(2000);
  }
  back(){
    this.slider.slidePrev(2000);
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
