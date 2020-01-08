import { ImageFile } from './../services/dal/image-uploader.service';
import { AuthService } from './../services/auth/auth.service';
import { LookupsService } from './../services/bll/lookups.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImageUploaderService } from '../services/dal/image-uploader.service';

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

  constructor(private formBuilder:FormBuilder,private lookup:LookupsService,private auth:AuthService,private router:Router,private imgUploader:ImageUploaderService) { 
    this.form=this.formBuilder.group({
      phone:['',[Validators.required,Validators.maxLength(12),Validators.minLength(10)]],
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      category_id:['',Validators.required],
      password:['',Validators.required],
      cpassword:['',Validators.required],
      country:['',Validators.required],
      city_id:['',Validators.required],
      address:['',Validators.required],
      talent_des:[''],
      nationality:['',Validators.required],
      img_user:['',Validators.required],
      img_id_no:['',Validators.required],
      birthdate:['',Validators.required],
    });

  }

  ngOnInit() {
    this.lookup.getChields(21,next=>this.categories=next)
    this.lookup.getCountries(next=>this.countries=next)
    
  }
  onSubmit(){
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
        });
        
      })
    },
    error=>{

    })
  }

  onCountryChange(){
    //console.log("ddddddd");
    this.lookup.getCities(this.form.get('country').value,next=>this.cities=next)
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
