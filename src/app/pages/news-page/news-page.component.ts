import { Component, OnInit } from '@angular/core';

//Model
import { News } from '../../models/news/news';
import { User } from '../../models/user/user';

//Service
import { NewsService } from '../../services/news-service/news.service';
import { AuthService } from '../../services/auth-service/auth.service';

//Database and Storage
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { NgForm } from '@angular/forms';

import { Observable, of } from 'rxjs';





@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  //booleans
  isNewsDialogOpen: boolean = false;
  isNewsDialogFormButtonDisabled: boolean = true;

  newsDocument: News = {
    news_photo_url: '',
    news_photo_name: '',

    news_title: '',
    news_content: '',

    news_timestamp_post_created: '',

    news_author_id: '',
    news_author_photo_url: '',
    news_author_name: '',
    news_author_email: ''
  };

  //file vars
  uploadPercent: Observable<number>;
  file: any;
  fileName;
  pushId;
  fileRef;

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private afDB: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  clearNewsDocOutput() {
    this.newsDocument = {
      news_photo_url: '',
      news_photo_name: '',

      news_title: '',
      news_content: '',

      news_timestamp_post_created: '',

      news_author_id: '',
      news_author_photo_url: '',
      news_author_name: '',
      news_author_email: ''
    };
  }
  openNewsDialog() {
    this.isNewsDialogOpen = true;
  }
  closeNewsDialog() {
    this.uploadPercent = null;
    this.file = null;
    this.fileName;

    this.pushId = null;

    this.fileRef = null;
    this.isNewsDialogOpen = false;
    this.clearNewsDocOutput();
  }


  uploadHandler(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;

    this.newsDocument.news_photo_name = this.fileName;
    this.pushId = this.afDB.createId();
    console.log('id used', this.pushId);
    this.fileRef = this.storage.ref('stiGo/news/' + this.pushId + '/' + this.fileName);
    let task = this.fileRef.put(this.file);
    this.uploadPercent = task.percentageChanges();
    task.then(snapshot => {
      this.fileRef.getDownloadURL().subscribe(url => {
        if (url !== null) {
          this.newsDocument.news_photo_url = url;
          console.log(url);
          this.isNewsDialogFormButtonDisabled = false;
          return true;
        }
      }, (error) => {
        console.log('Error on get url, will delete', error);
        this.storage.ref('stiGo/news/' + this.pushId + '/' + this.fileName).delete();
        this.closeNewsDialog();
        return of(false);
      });
    });
  }

  onSubmitCreateNews(newsForm: NgForm) {

    this.newsDocument.news_author_id = this.authService.userKey;
    this.newsDocument.news_author_photo_url = this.authService.userObj.user_photo_url;
    this.newsDocument.news_author_name = this.authService.userObj.user_name;
    this.newsDocument.news_author_email = this.authService.userObj.user_email;

    this.newsService.addNewsDocument(this.pushId, this.newsDocument);
    this.closeNewsDialog();
    newsForm.reset();
    //this.clearNewsDocOutput();
  }
}
