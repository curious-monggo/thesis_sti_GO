import { Component, OnInit } from '@angular/core';

//models
import { Program } from '../../models/program/program';

//service
import { AuthService } from '../../services/auth-service/auth.service';


@Component({
  selector: 'app-programs-page',
  templateUrl: './programs-page.component.html',
  styleUrls: ['./programs-page.component.css']
})
export class ProgramsPageComponent implements OnInit {
  isProgramDialogOpen:boolean = false;
  programType;

  programObj = {
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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  openProgramDialog() {
    this.isProgramDialogOpen = true;
  }
  closeProgramDialog() {
    this.isProgramDialogOpen = false;
  }

  onSubmitAddProgram() {
    console.log('Add program');
    console.log(this.programObj);

    this.programObj.program_author_id = this.authService.userKey;
    this.programObj.program_author_photo_url = this.authService.userObj.user_photo_url;
    this.programObj.program_author_name = this.authService.userObj.user_name;
    this.programObj.program_author_email = this.authService.userObj.user_email;


    
  }


}
