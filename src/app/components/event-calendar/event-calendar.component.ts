import { Component, OnInit, ViewChild } from '@angular/core';

import { EventService } from './../../services/event-service/event.service';


import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import { Observable } from 'rxjs';
import { of } from 'rxjs';



@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.css']
})
export class EventCalendarComponent implements OnInit {

  events:any=[];
  test=null;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private eventService: EventService) {
  
    
  }
   ngOnInit() {
    this.getEventsCollection();
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
        events: []
    };
    
  }

   

  // load(){
  //   this.getEventsCollection().subscribe(events => {
  //     this.test = this.events;
  //   });
  // }
  getEventsCollection(){
   // this.events =[];
    this.eventService.getEventsCollection().subscribe(eventCollection => {
      this.events =[];
      eventCollection.forEach(event => {
        // console.log(event);
        let fullCalendarEvent = {
          title: event.event_name,
          start: event.event_date,
        }        
        this.events.push(fullCalendarEvent);
      })
      
      // this.getEventsCollection();
      console.log('test');
      this.test = this.events;
    });

 
  }




}
