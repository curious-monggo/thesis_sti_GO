import { Injectable } from '@angular/core';

import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  devicesRef;
  docData;

  constructor(
    public firebaseNative: Firebase,
    private afAuth: AngularFireAuth,
    public afDb: AngularFirestore,
    private platform: Platform
  ) {
    console.log('Hello FcmProvider Provider');

  }
  // Get permission from the user
  async getToken() {

    let token;
  
    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
    } 
    console.log('token', token);
     this.saveTokenToFirestore(token);
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    console.log(token);
    this.afAuth.authState.subscribe(user => {
      if(user){
        if(token){
          this.devicesRef = this.afDb.doc(`devices/${token}`);
          this.docData = { 
            token: token,
            user_id: user.uid,
          };
          this.devicesRef.update(this.docData);
        }
      }
    });

    //if (token) {
      // this.devicesRef = this.afDb.doc(`devices/${token}`);
      // const docData = { 
      //   token,
      //   userId: 'testUser',
      // };
      // this.devicesRef.update(docData);
      // console.log('gumana sana', docData);
      
    //}



  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }
}
