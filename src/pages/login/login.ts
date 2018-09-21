import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { FcmProvider } from './../../providers/fcm/fcm';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private authProvider: AuthProvider,
    private fcm: FcmProvider
  ) {
      this.afAuth.authState.subscribe(user =>{
        if(user){
          this.navCtrl.setRoot('TabsPage');
          console.log(user.uid, 'uid to');
          // this.fcm.getToken()
        } else {
          console.log('Error on login, stay there');
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  googleSignIn(){
    console.log('Google Sign in');
    // this.authProvider.signInWithGoogle();
  }

  facebookSignIn(){
    console.log('Facebook Sign in');
    this.authProvider.signInWithFacebook();
  }
  goToHome(){
    this.navCtrl.setRoot('TabsPage');
  }
  // signOut(){
  //   this.authProvider.signOut();
  // }
}
