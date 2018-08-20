import { Injectable } from '@angular/core';

//AngularFire
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

//rxjs
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

//news model
import { News } from '../../models/news/news';


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
   }

   getNewsObj(id:string) {
     this.newsObjRef = this.afDB.object('news/'+id);
     this.newsObj = this.newsObjRef.valueChanges();
     return this.newsObj;
   }
   addNewsObj(newsObj:News) {
    this.newsListRef.push(newsObj);
   }
   updateNewsObj(id:string, newsObj:News){
    this.newsListRef.update(id, newsObj);
  }
   deleteNewsObj(id:string){
    this.newsListRef.remove(id);
  }

}
