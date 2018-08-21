import { Component, OnInit } from '@angular/core';

//model
import { Program } from './../../models/program/program';

//service
import { ProgramService } from './../../services/program-service/program.service';

//for unsubscribing
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-programs-card',
  templateUrl: './programs-card.component.html',
  styleUrls: ['./programs-card.component.css']
})
export class ProgramsCardComponent implements OnInit {

  isProgramCourseTabActive:boolean = true;
  isProgramUpdateDialogOpen:boolean = false;

  programList:Program[];


  programCourseListSubscription:Subscription;
  programTrackListSubscription:Subscription;

  programObjId;


  programObj:Program = {
    program_acronym:'',
    program_name:'',
    program_page_url:'',
    program_photo_url:'',

    program_timestamp_post_created:'',

    program_author_id:'',
    program_author_name:'',
    program_author_email:'',
    program_author_photo_url:''
  };

  constructor(
    private programService: ProgramService
  ) {
    if(this.isProgramCourseTabActive == true){
      this.getProgramCourseList();
    } else if(this.isProgramCourseTabActive == false){
      this.getProgramTrackList();
    }
  }

  ngOnInit() {
  }
  programCoursesTabSetToActive() {
    this.isProgramCourseTabActive = true;
    this.getProgramCourseList();

  }
  programTracksTabSetToActive() {
    this.isProgramCourseTabActive = false;
    this.getProgramTrackList();
    
  }





  getProgramCourseList() {
    this.programCourseListSubscription = this.programService.getProgramCourseList().
    subscribe(programCourseList => {
      this.programList = programCourseList;
    });
  }
  getProgramTrackList() {
    this.programTrackListSubscription = this.programService.getProgramTrackList().
    subscribe(programTrackList => {
      this.programList = programTrackList;
    });
  }

  //get obj
  getProgramCourseObj(programId:string) {
    this.programService.getProgramCourseObj(programId).subscribe(program => {
      this.programObj = {
        program_acronym:program.program_acronym,
        program_name:program.program_name,
        program_page_url:program.program_page_url,
        program_photo_url:program.program_photo_url,
    
        program_timestamp_post_created:'',
    
        program_author_id:program.program_author_id,
        program_author_name:program.program_author_name,
        program_author_email:program.program_author_email,
        program_author_photo_url:program.program_author_photo_url  
      };
    });
  }
  getProgramTrackObj(programCourseId:string) {
    this.programService.getProgramTrackObj(programCourseId).subscribe(programCourse => {
      this.programObj = {
        program_acronym:programCourse.program_acronym,
        program_name:programCourse.program_name,
        program_page_url:programCourse.program_page_url,
        program_photo_url:programCourse.program_photo_url,
    
        program_timestamp_post_created:'',
    
        program_author_id:programCourse.program_author_id,
        program_author_name:programCourse.program_author_name,
        program_author_email:programCourse.program_author_email,
        program_author_photo_url:programCourse.program_author_photo_url  
      };
    });
  }




  openProgramObjDialogUpdate(programObjId:string) {
    this.isProgramUpdateDialogOpen = true;
    this.programObjId = programObjId;
    if(this.isProgramCourseTabActive == true){
      this.getProgramCourseObj(programObjId);
    }
    else if(this.isProgramCourseTabActive == false){
      this.getProgramTrackObj(programObjId);
    }
  }
  closeProgramObjDialogUpdate() {
    this.isProgramUpdateDialogOpen = false;
    this.programObj = null;
  }
  onSubmitUpdateProgramObj() {
    // console.log('Obj'+this.newsObj.()); 
    if(this.isProgramCourseTabActive == true){
      this.programService.updateProgramCourseObj(this.programObjId, this.programObj);
    }
    else if(this.isProgramCourseTabActive == false){
      this.programService.updateProgramTrackObj(this.programObjId, this.programObj);
    }
    this.closeProgramObjDialogUpdate();
  }

  
  //wrapper
  deleteProgramObj(programObjId:string) {
    if(this.isProgramCourseTabActive == true){
      this.deleteProgramCourseObj(programObjId);
    }
    else if(this.isProgramCourseTabActive == false){
      this.deleteProgramTrackObj(programObjId);
    }
  }
  deleteProgramCourseObj(programObjId:string) {
    //console.log(programObjId);
    this.programService.deleteProgramCourseObj(programObjId);
  }
  deleteProgramTrackObj(programTrackObjId:string) {
    this.programService.deleteProgramTrackObj(programTrackObjId);
  }
}
