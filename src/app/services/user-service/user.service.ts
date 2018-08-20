import { Injectable } from '@angular/core';
//AngularFire
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

//Observable
import { Observable, Subscription } from 'rxjs';
import {map, first} from 'rxjs/operators'

import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	//list variables
	usersListRef: AngularFireList<User>;
	usersList: Observable<User[]>;//added client model
	//object variables
	userObjRef: AngularFireObject<User>;
  userObj: Observable<User>;
  userObjSubscription:Subscription;
  constructor(
    private afDb: AngularFireDatabase
  ) { 
    this.usersListRef = this.afDb.list('users');
    this.usersList = this.usersListRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   
  }

  addUserObj(userID:string, userObj:User){
    this.userObjRef = this.afDb.object(`users/${userID}`);
    this.userObj = this.userObjRef.valueChanges();
    this.userObjSubscription = this.userObj.subscribe((obj) => {

      if(obj){
        console.log('meron');
        this.userObjRef.update(userObj);

      }
      else {
        console.log('wala');
        this.usersListRef.update(userID, userObj);
      }
    });

  }
}
