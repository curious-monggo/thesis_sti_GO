import { Injectable } from '@angular/core';

//AngularFire
// old import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

//rxjs
import { Observable, Subscription } from 'rxjs';
import {map} from 'rxjs/operators';

//student model
import { Student } from './../../models/student/student';

import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
	//list variables
	studentCollectionRef: AngularFirestoreCollection<Student>;
  studentCollection: Observable<Student[]>;
  
	//object variables
	studentDocumentRef: AngularFirestoreDocument<Student>;
  studentDocument: Observable<Student>;
  studentObjSubscription:Subscription;


  constructor(
    private afDb: AngularFirestore
  ) {

   }

   getStudentCollection() {
    this.studentCollectionRef = this.afDb.collection('students');
    this.studentCollection = this.studentCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.studentCollection;
   }

   getStudentDocument(id:string) {
     this.studentDocumentRef = this.afDb.doc(`students/${id}`);
     this.studentDocument = this.studentDocumentRef.valueChanges();
     return this.studentDocument;
   }

  //  addStudentDocument(studentIdNumber:string, studentDoc:Student){
  //   this.studentDocumentRef = this.afDb.doc(`students/${studentIdNumber}`);
  //   this.studentDocumentRef.set(studentDoc)
  //     .then((studentDocument) => {
  //       console.log('Id of student added', studentIdNumber);
  //       this.studentDocumentRef = this.afDb.doc(`students/${studentIdNumber}`);

  //       this.studentDocumentRef.update({student_timestamp_added: firebase.firestore.FieldValue.serverTimestamp()});
  //     }).catch((error) =>{
  //       console.log('Error on student doc add or update ', error);
  //   });
  //  }
  //  addStudentDoc(studentIdNumber:string, studentObj:Student) {
  //   this.studentCollectionRef.set(studentIdNumber, studentObj);
  //  }
   updateStudentDoc(id:string, studentDocument:Student){
    this.studentDocumentRef = this.afDb.doc(`students/${id}`);
    this.studentDocumentRef.update(studentDocument);
  }
   deleteStudentDoc(id:string){
    this.studentDocumentRef = this.afDb.doc(`students/${id}`);
    this.studentDocumentRef.delete()
    // this.studentColonRef.remove(id);
  }
  
  addStudentDocument(studentDocument:Student){
    this.studentCollectionRef = this.afDb
    .collection('students', ref => 
      ref.where('student_id_number', '==', studentDocument.student_id_number));
      this.studentCollection = this.studentCollectionRef.valueChanges();
      this.studentCollection.subscribe((studentColl) => {
        if(studentColl.length >0){
          console.log('Student is already in the system');
          console.log(studentColl);
        }
        else {
          console.log('new student');
          this.studentCollectionRef.add(studentDocument);
        }
      });
    // this.studentDocumentRef = this.afDb.doc(`students/${studentIdNumber}`);
    // this.studentDocument = this.studentDocumentRef.valueChanges();

    // this.studentDocument.subscribe((studentDoc) => {
    //   if(studentDoc){
    //     console.log('Student is already in the system');
    //   }
    //   else {
    //     console.log('new student');
    //     this.studentCollectionRef.add(studentDocument);
    //   }
    // });
  }
  
  //Check if student already exists in database using the student id. Not based on names.
  //then add said student obj 
  // checkIfStudentDoc(studentIdNumber:string, studentObj:Student) {
  //   this.studentObjRef = this.afDb.object(`students/${studentIdNumber}`);
  //   this.studentObj = this.studentObjRef.valueChanges();
  //   console.log('Before subscription');
  //   this.studentObjSubscription = this.studentObj.subscribe((obj) => {
  //     console.log('After subscription');
      
  //     if(obj !==null){

  //       console.log('Student ID already exists');
  //       this.studentObjSubscription.unsubscribe();

  //     }
  //     else {
  //       console.log('Student ID does not exist');
  //       this.addStudentObj(studentIdNumber, studentObj);
  //       this.studentObjSubscription.unsubscribe();  
  //     }
  //   });
  //   console.log('Check');
    //this.studentObjSubscription.unsubscribe();
  // }

}
