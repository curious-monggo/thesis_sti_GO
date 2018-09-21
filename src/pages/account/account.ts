import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import { AuthProvider } from './../../providers/auth/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  userDocRef: any;
  userDoc: any;
  isStudent: boolean =false;
  notice:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private afDb: AngularFirestore,
    private afAuth: AngularFireAuth
    ) {
      this.afAuth.authState.subscribe(user => {
        
        this.userDocRef = this.afDb.doc(`users/${user.uid}`);
        this.userDoc = this.userDocRef.valueChanges();
        
        
        this.userDoc.subscribe(user => {
          if(user.user_type == 'student' || user.user_type == 'sbg'){
            this.isStudent == true;
            console.log(user.user_type);
            this.notice = 'You have already registered as a student.'
        
          }
          else{
            this.isStudent == false;
            this.notice ='Register account as student';
          }
        });
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  goToRegistrationCodePage(){
    this.navCtrl.push('RegistrationCodePage');
  }
  signOut(){
    this.authProvider.signOut();
    this.navCtrl.setRoot('TabsPage');
  }

}
