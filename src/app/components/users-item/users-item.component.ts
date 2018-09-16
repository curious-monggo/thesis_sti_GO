import { Component, OnInit } from '@angular/core';

//model
import { Student } from './../../models/student/student';

//service
import { StudentService } from './../../services/student-service/student.service';

//for unsubscribing
import { Subscription } from 'rxjs';

import * as hash from '../../../../node_modules/hashids/dist/hashids.min.js';
@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.css']
})
export class UsersItemComponent implements OnInit {
  studentCollection:Student[];
  isUsersUpdateDialogOpen:boolean = false;
  studentIdNumber;


  studentDocument:Student={
    student_id_number:'',
    student_first_name:'',
    student_middle_name:'',
    student_last_name:'',
    student_program:'',
    student_year_level:''
  };


  studentCollectionSubscription:Subscription;
  constructor(
    private studentService: StudentService
  ) { 
    this.getStudentCollection();

  }

  ngOnInit() {
  }
  getStudentCollection() {
    this.studentCollectionSubscription = this.studentService.getStudentCollection().
    subscribe(studentCollection => {
      this.studentCollection = studentCollection;
    });
  }
  getStudentDocument(studentId:string){
    this.studentService.getStudentDocument(studentId).subscribe(studentDoc => {

      console.log('getstuddicid',studentId);
      this.studentIdNumber = studentId;

      // let dateCreated = new Date(newsDocument.news_timestamp_post_created.toDate());
      // let convertDateToLocale = dateCreated.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, month: 'short', day: 'numeric', year: 'numeric' });
      // console.log(dateCreated);

      // this.dateTime = convertDateToLocale;

      this.studentDocument = {
        student_id_number:studentDoc.student_id_number,   
        student_first_name:studentDoc.student_first_name,
        student_middle_name:studentDoc.student_middle_name,
        student_last_name:studentDoc.student_last_name,
        student_program:studentDoc.student_program,
        student_year_level:studentDoc.student_year_level
      };

      const hashids = new hash();
      let id = hashids.encode(this.studentDocument.student_id_number);
      let number = hashids.decode(id);
      console.log(id, number[0]);

    });

    
  }
  openUsersDialogUpdate(studentId:string) {
    this.isUsersUpdateDialogOpen = true;
    this.studentIdNumber = studentId;
    // this.newsPageComponent.getNewsObj(newsId);
    this.getStudentDocument(studentId);
  }
  closeUsersDialogUpdate() {
    this.studentIdNumber = null;
    this.isUsersUpdateDialogOpen = false;
    
  }
  clearInput(){
    this.studentDocument = {
      student_id_number:'',
      student_first_name:'',
      student_middle_name:'',
      student_last_name:'',
      student_program:'',
      student_year_level:''
    };
  }
  onSubmitUpdateNewsDocument() {
    console.log('id'+this.studentIdNumber);
    this.studentService.updateStudentDoc(this.studentIdNumber, this.studentDocument);
    this.closeUsersDialogUpdate();  
    this.clearInput();
  }
  deleteStudentDocument(id){
    this.studentService.deleteStudentDoc(id);
  }
}
