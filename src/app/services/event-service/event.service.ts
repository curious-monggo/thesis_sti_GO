import { Injectable } from '@angular/core';

//AngularFire
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

//event model
import { Event } from '../../models/event/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

	//list variables
	eventListRef: AngularFireList<Event>;
  eventList: Observable<Event[]>;
  
	//object variables
	eventObjRef: AngularFireObject<Event>;
  eventObj: Observable<Event>;

  constructor(private afDB: AngularFireDatabase) {
    this.eventListRef = afDB.list('events');

    //use snapshot changes.map to store key
    this.eventList = this.eventListRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }
   getEventList(){
     return this.eventList;
   }

   getEventObj(id:string){
     this.eventObjRef = this.afDB.object('events/'+id);
     this.eventObj = this.eventObjRef.valueChanges();
     return this.eventObj
   }

   addEventObj(eventObj:Event){
     this.eventListRef.push(eventObj);
   }

   updateEventObj(id:string, eventObj:Event) {
     this.eventListRef.update(id, eventObj);
   }

   deleteEventObj(id:string) {
     this.eventListRef.remove(id);
   }


}
