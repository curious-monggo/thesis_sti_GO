import { Injectable } from '@angular/core';

//AngularFire
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

//news model
import { News } from '../../models/news/news';

import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

	//list variables
	newsListRef: AngularFireList<News>;
  newsList: Observable<News[]>;
  
	//object variables
	newsObjRef: AngularFireObject<News>;
  newsObj: Observable<News>;
  
  constructor(private afDB: AngularFireDatabase) {
    this.newsListRef = afDB.list('news');

    //use snapshot changes.map to store key
    this.newsList = this.newsListRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   }

   getNewsList() {
    return this.newsList;
    // console.log(this.newsList);
   }

   getNewsObj(id:string) {
     this.newsObjRef = this.afDB.object('news/'+id);
     this.newsObj = this.newsObjRef.valueChanges();
     return this.newsObj;
   }
   addNewsObj(newsObj:News) {
    this.newsListRef.push(newsObj).then((snap) => {
      const key = snap.key;
      console.log(key);
      // let datestampRef = this.afDB.list('news/'+key);
      this.newsListRef.update(key, {news_timestamp_post_created: firebase.database.ServerValue.TIMESTAMP});
    });
   }
   updateNewsObj(id:string, newsObj:News){
    this.newsListRef.update(id, newsObj);
  }
   deleteNewsObj(id:string){
    this.newsListRef.remove(id);
  }
}
