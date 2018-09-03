import { Injectable } from '@angular/core';
//AngularFire
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

//Observable
import { Observable, Subscription } from 'rxjs';
import {map, first} from 'rxjs/operators';

import { Student } from './../../models/student/student';

//notif


@Injectable({
  providedIn: 'root'
})
export class StudentService {
	//list variables
	studentListRef: AngularFireList<Student>;
	studentList: Observable<Student[]>;//added client model
	//object variables
	studentObjRef: AngularFireObject<Student>;
  studentObj: Observable<Student>;

  studentObjSubscription:Subscription;


  constructor(
    private afDb: AngularFireDatabase
  ) {
    this.studentListRef = this.afDb.list('students');
    this.studentList = this.studentListRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }

   getStudentList() {
    return this.studentList;
    // console.log(this.newsList);
   }

   getStudentObj(id:string) {
     this.studentObjRef = this.afDb.object('news/'+id);
     this.studentObj = this.studentObjRef.valueChanges();
     return this.studentObj;
   }
   addStudentObj(studentIdNumber:string, studentObj:Student) {
    this.studentListRef.update(studentIdNumber, studentObj);
   }
   updateStudentObj(id:string, studentObj:Student){
    this.studentListRef.update(id, studentObj);
  }
   deleteStudentObj(id:string){
    this.studentListRef.remove(id);
  }
  
  
  //Check if student already exists in database using the student id. Not based on names.
  //then add said student obj 
  checkIfStudentObj(studentIdNumber:string, studentObj:Student) {
    this.studentObjRef = this.afDb.object(`students/${studentIdNumber}`);
    this.studentObj = this.studentObjRef.valueChanges();
    console.log('Before subscription');
    this.studentObjSubscription = this.studentObj.subscribe((obj) => {
      console.log('After subscription');
      
      if(obj !==null){

        console.log('Student ID already exists');
        this.studentObjSubscription.unsubscribe();

      }
      else {
        console.log('Student ID does not exist');
        this.addStudentObj(studentIdNumber, studentObj);
        this.studentObjSubscription.unsubscribe();  
      }
    });
    console.log('Check');
    //this.studentObjSubscription.unsubscribe();
  }

}
