import { Injectable } from '@angular/core';

//AngularFire
// old import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//Storage
import { AngularFireStorage } from 'angularfire2/storage';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

//program model
import { Program } from './../../models/program/program';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

	//list variables
	trackCollectionRef: AngularFirestoreCollection<Program>;
  trackCollection: Observable<Program[]>;
  
	//object variables
	trackDocumentRef: AngularFirestoreDocument<Program>;
  trackDocument: Observable<Program>;

  uploadPercent: Observable<number>;

  constructor(
    private afDB: AngularFirestore,
    private storage: AngularFireStorage
  ) {

   }


   getTrackCollection() {
    this.trackCollectionRef = this.afDB.collection('tracks', ref => ref.orderBy('program_timestamp_post_created', 'desc'));
    this.trackCollection = this.trackCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Program;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.trackCollection;
   }

   getTrackDocument(id:string) {
     this.trackDocumentRef = this.afDB.doc(`tracks/${id}`);
     this.trackDocument = this.trackDocumentRef.valueChanges();
     return this.trackDocument;
   }
   addTrackDocument(trackDocumentID ,trackDocument:Program) {

    this.trackDocumentRef = this.afDB.doc(`tracks/${trackDocumentID}`);
    this.trackDocumentRef.set(trackDocument)
      .then((trackDocument) => {
        console.log('ID of track doc added ', trackDocumentID);
        this.trackDocumentRef = this.afDB.doc(`tracks/${trackDocumentID}`);

        this.trackDocumentRef.update({program_timestamp_post_created: firebase.firestore.FieldValue.serverTimestamp()});
    }).catch((error) =>{
        console.log('Error on track doc add or update ', error);
    }); 

   }
   updateTrackDocument(id:string, trackDocument:Program){
    this.trackDocumentRef = this.afDB.doc(`tracks/${id}`);
    this.trackDocumentRef.update(trackDocument);
  }
   deleteTrackDocument(id:string, fileName){
    this.trackDocumentRef = this.afDB.doc(`tracks/${id}`);
    this.trackDocumentRef.delete()
    this.storage.ref('stiGo/tracks/'+id+'/'+fileName).delete();
  }

}
