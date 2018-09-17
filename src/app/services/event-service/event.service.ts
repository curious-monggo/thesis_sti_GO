import { Injectable } from '@angular/core';

//AngularFire
// old import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

//event model
import { Event } from '../../models/event/event';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventService {

	//list variables
	eventCollectionRef: AngularFirestoreCollection<Event>;
  eventCollection: Observable<Event[]>;
  
	//object variables
	eventDocumentRef: AngularFirestoreDocument<Event>;
  eventDocument: Observable<Event>;

  constructor(private afDB: AngularFirestore) {

   }
   getEventsCollection() {
    this.eventCollectionRef = this.afDB.collection('events');
    this.eventCollection = this.eventCollectionRef.valueChanges();
    return this.eventCollection;
    // console.log(this.newsList);
   }

   getEventDocument(id:string) {
    this.eventDocumentRef = this.afDB.doc(`events/${id}`);
    this.eventDocument = this.eventDocumentRef.valueChanges();
    return this.eventDocument;
  }
   
  addEventDocument(eventDocument:Event) {
    console.log(eventDocument.event_date);
    this.eventCollectionRef = this.afDB.collection('events');
    this.eventCollectionRef.add(eventDocument).then(eventDoc => {
      console.log(eventDoc.id);
      this.eventDocumentRef = this.afDB.doc(`events/${eventDoc.id}`);
      this.eventDocumentRef.update({event_timestamp_post_created: firebase.firestore.FieldValue.serverTimestamp()});
    }).catch((error) => {
      console.log('Error on event doc add or update ', error);
    });



    // this.eventDocumentRef = this.afDB.doc(`news/${eventDocumentID}`);
    // this.eventDocumentRef.set(eventDocument)
    //   .then((eventDocument) => {
    //     console.log('ID of event doc added ', eventDocumentID);
    //     this.eventDocumentRef = this.afDB.doc(`news/${eventDocumentID}`);

    //     this.eventDocumentRef.update({event_timestamp_post_created: firebase.firestore.FieldValue.serverTimestamp()});
    // }).catch((error) =>{
    //     console.log('Error on event doc add or update ', error)
    // });
   }
   updateEventDocument(id:string, eventDocument:Event){
    this.eventDocumentRef = this.afDB.doc(`events/${id}`);
    this.eventDocumentRef.update(eventDocument);
  }
   deleteEventDocument(id:string){
    this.eventDocumentRef = this.afDB.doc(`events/${id}`);
    this.eventDocumentRef.delete()
    // this.storage.ref('stiGo/events/'+id+'/'+fileName).delete();
  }

}
