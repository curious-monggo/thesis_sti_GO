import { Injectable } from '@angular/core';

//AngularFire
// old import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable, Subscription } from 'rxjs';
import {map} from 'rxjs/operators';

import { User } from '../../models/user/user';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	//list variables
	userCollectionRef: AngularFirestoreCollection<User>;
  userCollection: Observable<User[]>;
  
	//object variables
	userDocumentRef: AngularFirestoreDocument<User>;
  userDocument: Observable<User>;
  userObjSubscription:Subscription;
  constructor(
    private afDb: AngularFirestore
  ) { 
    this.userCollectionRef = this.afDb.collection('users');

  }

  // getUserCollection(){

  // }

  addUserDocument(userID:string, userDocument:User){
    this.userDocumentRef = this.afDb.doc(`users/${userID}`);
    this.userDocument = this.userDocumentRef.valueChanges();
    this.userObjSubscription = this.userDocument.subscribe((userDoc) => {
      if(userDoc){
        console.log('Old user');
        if(userDoc !== userDocument){
        //mahal to
        this.userDocumentRef.update(userDocument);
        }
      }
      else {
        console.log('New user');
        this.userDocumentRef.set(userDocument);
      }
    });
  }
}
