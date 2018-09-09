import { Component, OnInit } from '@angular/core';

//Storage
import { AngularFireStorage } from 'angularfire2/storage';

//model
import { Program } from './../../models/program/program';

//service
import { CourseService } from '../../services/course-service/course.service';
import { TrackService } from '../../services/track-service/track.service';

//for unsubscribing
import { Subscription, Observable, of } from 'rxjs';

//for form reset
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-programs-card',
  templateUrl: './programs-card.component.html',
  styleUrls: ['./programs-card.component.css']
})
export class ProgramsCardComponent implements OnInit {

  isProgramCourseTabActive:boolean = true;
  isProgramUpdateDialogOpen:boolean = false;
  isProgramDialogFormButtonDisabled = true;
  isProgramConfirmDeleteDialogOpen = false;
  isProgramImageAvailable = true;

  programCollection:Program[];

  programCourseCollectionSubscription:Subscription;
  programTrackCollectionSubscription:Subscription;

  programDocumentId;
  programType;


  programDocument:Program = {
    program_photo_url:'',
    program_photo_name:'',
    program_acronym:'',
    program_name:'',
    program_page_url:'',

    program_timestamp_post_created:'',

    program_author_id:'',
    program_author_name:'',
    program_author_email:'',
    program_author_photo_url:''
  };

  
  uploadPercent: Observable<number>;
  file:any;
  fileName;
  fileRef;
  dateTime;

  constructor(
    private courseService: CourseService,
    private trackService: TrackService,
    private storage: AngularFireStorage
  ) {
    if(this.isProgramCourseTabActive == true){
      this.getProgramCourseCollection();
    } else if(this.isProgramCourseTabActive == false){
      this.getProgramTrackCollection();
    }
  }

  ngOnInit() {
  }
  programCoursesTabSetToActive() {
    this.isProgramCourseTabActive = true;
    this.getProgramCourseCollection();

  }
  programTracksTabSetToActive() {
    this.isProgramCourseTabActive = false;
    this.getProgramTrackCollection();
    
  }

  getProgramCourseCollection() {
    this.programCourseCollectionSubscription = this.courseService.getCourseCollection().
    subscribe(programCourseCollection => {
      this.programCollection = programCourseCollection;
    });
  }
  getProgramTrackCollection() {
    this.programTrackCollectionSubscription = this.trackService.getTrackCollection().
    subscribe(programTrackCollection => {
      this.programCollection = programTrackCollection;
    });
  }

  //get obj
  getProgramCourseDocument(programId:string) {
    this.courseService.getCourseDocument(programId).subscribe(courseDocument => {
      this.programDocument = {
        program_photo_url:courseDocument.program_photo_url,
        program_photo_name:courseDocument.program_photo_name,

        program_acronym:courseDocument.program_acronym,
        program_name:courseDocument.program_name,
        program_page_url:courseDocument.program_page_url,


    
        program_timestamp_post_created:'',
    
        program_author_id:courseDocument.program_author_id,
        program_author_name:courseDocument.program_author_name,
        program_author_email:courseDocument.program_author_email,
        program_author_photo_url:courseDocument.program_author_photo_url  
      };
      console.log(this.programDocument);
    });
  }
  getProgramTrackDocument(programId:string) {
    this.trackService.getTrackDocument(programId).subscribe(trackDocument => {
      this.programDocument = {
        program_photo_url:trackDocument.program_photo_url,
        program_photo_name:trackDocument.program_photo_name,

        program_acronym:trackDocument.program_acronym,
        program_name:trackDocument.program_name,
        program_page_url:trackDocument.program_page_url,
    
        program_timestamp_post_created:'',
    
        program_author_id:trackDocument.program_author_id,
        program_author_name:trackDocument.program_author_name,
        program_author_email:trackDocument.program_author_email,
        program_author_photo_url:trackDocument.program_author_photo_url  
      };
    });
  }


  onChangeImageHandler(event) {
    this.isProgramDialogFormButtonDisabled = true;
    if(this.isProgramCourseTabActive == true){
      this.programType='courses';
      console.log('course image');
    }
    else if(this.isProgramCourseTabActive == false){
      this.programType='tracks';
      console.log('track image');
    }
    console.log(this.programDocument.program_photo_name, 'is this undefined?');
    
    this.fileRef = this.storage.ref('stiGo/'+this.programType+'/'+this.programDocumentId+'/'+this.programDocument.program_photo_name).delete();

    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;

    this.programDocument.program_photo_name = this.fileName;

    this.fileRef = this.storage.ref('stiGo/'+this.programType+'/'+this.programDocumentId+'/'+this.programDocument.program_photo_name);

    let task = this.fileRef.put(this.file);
    this.uploadPercent = task.percentageChanges();
    task.then(snapshot =>{
      this.fileRef.getDownloadURL().subscribe(url =>{
        if(url){
          this.programDocument.program_photo_url = url;
          console.log(url);
          this.isProgramDialogFormButtonDisabled = false;
          return true;
        }
        

        
      }, (error)=>{
          console.log('Error on get url, will delete',error);
          this.storage.ref('stiGo/'+this.programType+'/'+this.programDocumentId+'/'+this.fileName).delete();
          this.closeProgramDocumentDialogUpdate();
          return of(false);
      });
    });
  }

  openProgramDocumentDialogUpdate(programDocumentId:string) {
    this.isProgramUpdateDialogOpen = true;
    this.isProgramDialogFormButtonDisabled = false;
    this.programDocumentId = programDocumentId;
    if(this.isProgramCourseTabActive == true){
      this.getProgramCourseDocument(programDocumentId);
      console.log('onUpdate id course', programDocumentId);
    }
    else if(this.isProgramCourseTabActive == false){
      this.getProgramTrackDocument(programDocumentId);
      console.log('onUpdate id track', programDocumentId);
    }
  }
  closeProgramDocumentDialogUpdate() {
    this.isProgramUpdateDialogOpen = false;
    this.uploadPercent = null;
    this.file = null;
    this.fileName = null

  
    this.fileRef = null;
    this.programDocumentId = null;
    // this.programDocument = null; wrong practice
    // this.programDocument = {
    //   program_photo_url:'',
    //   program_photo_name:'',
    //   program_acronym:'',
    //   program_name:'',
    //   program_page_url:'',
  
    //   program_timestamp_post_created:'',
  
    //   program_author_id:'',
    //   program_author_name:'',
    //   program_author_email:'',
    //   program_author_photo_url:''
    // };
  }
  
  hideImage(){
    this.isProgramImageAvailable = false;
  }
  showImage(){
    this.isProgramImageAvailable = true;
  }
  
  openProgramConfirmDeleteDialog(programDocumentId:string,programDocumentPhotoName) {
    if(this.isProgramCourseTabActive == true){
      this.getProgramCourseDocument(programDocumentId);
      this.isProgramConfirmDeleteDialogOpen = true;
      this.programDocumentId = programDocumentId;
      console.log(programDocumentId, programDocumentPhotoName, 'opemDelete');
    }
    else if(this.isProgramCourseTabActive == false){
      this.getProgramTrackDocument(programDocumentId);
      this.isProgramConfirmDeleteDialogOpen = true;
      this.programDocumentId = programDocumentId;
      console.log(programDocumentId);
    }

  }
  closeProgramConfirmDeleteDialog() {
    this.isProgramConfirmDeleteDialogOpen = false;
  }
  onSubmitUpdateProgramDocument(programForm: NgForm) {
    // console.log('Obj'+this.newsObj.()); 
    if(this.isProgramCourseTabActive == true){
      this.courseService.updateCourseDocument(this.programDocumentId, this.programDocument);
    }
    else if(this.isProgramCourseTabActive == false){
      this.trackService.updateTrackDocument(this.programDocumentId, this.programDocument);
    }
    this.closeProgramDocumentDialogUpdate();
    // programForm.reset(); 
  }

  
  //wrapper
  deleteProgramDocument() {
    if(this.isProgramCourseTabActive == true){
      this.deleteProgramCourseDocument();
    }
    else if(this.isProgramCourseTabActive == false){
      this.deleteProgramTrackObj();
    }
  }
  deleteProgramCourseDocument() {
    //console.log(programObjId);
    console.log(this.programDocumentId, this.programDocument.program_photo_name);
    this.courseService.deleteCourseDocument(this.programDocumentId, this.programDocument.program_photo_name);
    this.closeProgramConfirmDeleteDialog();
  }
  deleteProgramTrackObj() {
    console.log(this.programDocumentId, this.programDocument.program_photo_name);
    this.trackService.deleteTrackDocument(this.programDocumentId, this.programDocument.program_photo_name);
    this.closeProgramConfirmDeleteDialog();
  }
}
