import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(    private fb: Facebook,
    private fireAuth: AngularFireAuth ) { }


    async login() {

      this.fb.login(['email'])
        .then((response: FacebookLoginResponse) => {
          this.onLoginSuccess(response);
          console.log(response.authResponse.accessToken);
        }).catch((error) => {
          console.log(error)
          alert('error:' + error)
        });
    }
    onLoginSuccess(res: FacebookLoginResponse) {
      // const { token, secret } = res;
      const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
     return  this.fireAuth.auth.signInWithCredential(credential)
        .then((response) => {
          // this.router.navigate(["/profile"]);
          // this.loading.dismiss();
          console.log(response);
        })
  
    }
    onLoginError(err) {
      console.log(err);
    }

    
  }
  

