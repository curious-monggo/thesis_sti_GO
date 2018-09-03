import { Component, OnInit, ViewChild } from '@angular/core';

//calendar component and options
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from '../../services/event-service/event.service';

import { Event } from './../../models/event/event';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  calendarOptions: Options;
  displayEvent: any;
  events = null;
  isEventsDialogOpen:boolean = false;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;


  eventObj:Event = {
    event_title: '',
    event_start: ''
  };

  constructor(protected eventService:EventService) {

  }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: true,
      selectable: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };
  }
  openEventsDialog() {
    this.isEventsDialogOpen = true;
    console.log(this.isEventsDialogOpen);
  }
  closeEventsDialog() {
    this.isEventsDialogOpen = false;
    console.log(this.isEventsDialogOpen);
  }
  // onSubmitCreateEvent() {
  //   this.newsObj.news_author_id = this.authService.userKey;
  //   this.newsObj.news_author_photo_url = this.authService.userObj.user_photo_url;
  //   this.newsObj.news_author_name = this.authService.userObj.user_name;
  //   this.newsObj.news_author_email = this.authService.userObj.user_email;
  
  //   this.newsService.addNewsObj(this.newsObj);
  //   this.closeNewsDialog();
  // }
  // loadevents() {
  //   this.eventService.getEvents().subscribe(data => {
  //     this.events = data;
  //   });
  // }
  // clickButton(model: any) {
  //   this.displayEvent = model;
  // }
  // dayClick(model: any) {
  //   console.log(model);
  // }
  // eventClick(model: any) {
  //   model = {
  //     event: {
  //       id: model.event.id,
  //       start: model.event.start,
  //       end: model.event.end,
  //       title: model.event.title,
  //       allDay: model.event.allDay
  //       // other params
  //     },
  //     duration: {}
  //   }
  //   this.displayEvent = model;
  // }
  // updateEvent(model: any) {
  //   model = {
  //     event: {
  //       id: model.event.id,
  //       start: model.event.start,
  //       end: model.event.end,
  //       title: model.event.title
  //       // other params
  //     },
  //     duration: {
  //       _data: model.duration._data
  //     }
  //   }
  //   this.displayEvent = model;
  // }

}
