import { News } from './../../models/news/news';
import { Component, OnInit } from '@angular/core';

//model
import { NewsService } from './../../services/news-service/news.service';
import { Subscription } from '../../../../node_modules/rxjs';

//page


@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  isNewsCardOpen:boolean = false;
  isNewsUpdateDialogOpen:boolean = false;

  newsList:any[];

  newsListSubscription:Subscription;

  newsObjId;

  newsObj = {
    news_photo_url:'',
    news_title:'',
    news_content:'',

    news_timestamp_post_created:'',

    news_author_id:'',
    news_author_photo_url:'',
    news_author_name:'',
    news_author_email:''
  };

  constructor(
    private newsService: NewsService,
  ) {
    this.getNewsList();
    
  }

  ngOnInit() {
  }

  getNewsList() {
    this.newsListSubscription = this.newsService.getNewsList().
    subscribe(newsList => {
      this.newsList= newsList;
    });
  }
  getNewsObj(newsObjId:string){
    this.newsService.getNewsObj(newsObjId).subscribe(news => {
      this.newsObj = {
        news_photo_url:news.news_photo_url,
        news_title:news.news_title,
        news_content:news.news_content,

        news_timestamp_post_created:'',
    
        news_author_id:news.news_author_id,
        news_author_photo_url:news.news_author_photo_url,
        news_author_name:news.news_author_name,
        news_author_email:news.news_author_email
      };

    });
    console.log(this.newsObj);
    console.log(this.newsObjId);

    
  }
  openNewsCardDetail(newsObjId:string) {
    this.isNewsCardOpen = true;
    this.newsObjId = newsObjId;
    this.getNewsObj(newsObjId);
  }
  closeNewsCardDetail() {
    this.isNewsCardOpen = false;


    //setting to null creates errors. minor fix needed. patch for now
  }

  openNewsDialogUpdate(newsObjId:string) {
    this.isNewsUpdateDialogOpen = true;
    this.newsObjId = newsObjId;
    // this.newsPageComponent.getNewsObj(newsId);
    this.getNewsObj(newsObjId);
  }
  closeNewsDialogUpdate() {
    this.isNewsUpdateDialogOpen = false;
    this.newsObj = null;
  }
  onSubmitUpdateNewsObj() {
    // console.log('Obj'+this.newsObj.()); 
    this.newsObj = {
      news_photo_url:this.newsObj.news_photo_url,
      news_title:this.newsObj.news_title,
      news_content:this.newsObj.news_content,

      news_timestamp_post_created:'',
  
      news_author_id:this.newsObj.news_author_id,
      news_author_photo_url:this.newsObj.news_author_photo_url,
      news_author_name:this.newsObj.news_author_name,
      news_author_email:this.newsObj.news_author_email
    };
    console.log('id'+this.newsObjId);
    this.newsService.updateNewsObj(this.newsObjId, this.newsObj);
    this.closeNewsDialogUpdate();
  }



  deleteNewsObj(newsObjId:string) {
    this.newsService.deleteNewsObj(newsObjId);
  }
  trigger() {
    console.log('pindot');
  }
  
}
