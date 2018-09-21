import { AttendanceProvider } from './../../providers/attendance/attendance';


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HotspotProvider } from './../../providers/hotspot/hotspot';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     private hotspotProvider:HotspotProvider,
     private toastCtrl:ToastController,
     private attendanceProvider: AttendanceProvider){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  openAttendancePage(){
    this.navCtrl.push('AttendancePage');
  }

  hostAttendance(){
    this.hotspotProvider.createHotspot('EventName', 'hashedPassword');
  }
  signForAttendance(){
    this.hotspotProvider.connectToHotspot('EventName', 'hashedPassword');
    // this.attendanceProvider.signForAttendance();
    //this.hotspotProvider.removeWifiNetwork('EventName');
  }
  toast(message){
    let toast = this.toastCtrl.create({
      message:message,
      position:'bottom',
      duration: 3000
    });
    toast.present();
  }

}
