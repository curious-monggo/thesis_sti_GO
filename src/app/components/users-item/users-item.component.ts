import { Component, OnInit } from '@angular/core';

//model
import { Student } from './../../models/student/student';

//service
import { StudentService } from './../../services/student-service/student.service';

//for unsubscribing
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.css']
})
export class UsersItemComponent implements OnInit {
  studentList:Student[];

  studentListSubscription:Subscription;
  constructor(
    private studentService: StudentService
  ) { 
    this.getStudentList();
  }

  ngOnInit() {
  }
  getStudentList() {
    this.studentListSubscription = this.studentService.getStudentList().
    subscribe(studentList => {
      this.studentList = studentList;
    });
  }
}
