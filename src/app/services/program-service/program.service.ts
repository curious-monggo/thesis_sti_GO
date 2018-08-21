import { Injectable } from '@angular/core';

//AngularFire
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

//program model
import { Program } from './../../models/program/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
	//list variables
	programCourseListRef: AngularFireList<Program>;
  programCourseList: Observable<Program[]>;
  
	//object variables
	programCourseObjRef: AngularFireObject<Program>;
  programCourseObj: Observable<Program>;

	//list variables
	programTrackListRef: AngularFireList<Program>;
  programTrackList: Observable<Program[]>;
  
	//object variables
	programTrackObjRef: AngularFireObject<Program>;
  programTrackObj: Observable<Program>;
  
  constructor(private afDB: AngularFireDatabase) {
    this.programCourseListRef = afDB.list('programs/courses');

    //use snapshot changes.map to store key
    this.programCourseList = this.programCourseListRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.programTrackListRef = afDB.list('programs/tracks');
    //use snapshot changes.map to store key
    this.programTrackList = this.programTrackListRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }

   getProgramCourseList() {
    return this.programCourseList;
   }

   getProgramCourseObj(programCourseObjId:string) {
     this.programCourseObjRef = this.afDB.object('programs/courses/'+programCourseObjId);
     this.programCourseObj = this.programCourseObjRef.valueChanges();
     return this.programCourseObj;
   }
   addProgramCourseObj(programCourseObj:Program) {
    this.programCourseListRef.push(programCourseObj);
   }
   updateProgramCourseObj(programCourseObjId:string, programCourseObj:Program){
    this.programCourseListRef.update(programCourseObjId, programCourseObj);
  }
   deleteProgramCourseObj(programCourseObjId:string){
     console.log(programCourseObjId);
    this.programCourseListRef.remove(programCourseObjId);
  }


  getProgramTrackList() {
    return this.programTrackList;
   }

   getProgramTrackObj(programTrackObjId:string) {
     this.programTrackObjRef = this.afDB.object('programs/tracks/'+programTrackObjId);
     this.programTrackObj = this.programTrackObjRef.valueChanges();
     return this.programTrackObj;
   }
   addProgramTrackObj(programTrackObj:Program) {
    this.programTrackListRef.push(programTrackObj);
   }
   updateProgramTrackObj(programTrackObjId:string, programTrackObj:Program){
    this.programTrackListRef.update(programTrackObjId, programTrackObj);
  }
   deleteProgramTrackObj(programTrackObjId:string){
     console.log(programTrackObjId);
    this.programTrackListRef.remove(programTrackObjId);
  }

}
