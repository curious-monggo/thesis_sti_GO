import { Component, OnInit } from '@angular/core';

//Model
import { News } from '../../models/news/news';
import { User } from '../../models/user/user';

//Service
import { NewsService } from '../../services/news-service/news.service';
import { AuthService } from '../../services/auth-service/auth.service';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  isNewsDialogOpen:boolean = false;

  newsList:News[];

  newsObj:News = {

    
    news_photo_url:'',
    news_title:'',
    news_content:'',

    news_timestamp_post_created:'',
    
    news_author_id:'',
    news_author_photo_url:'',
    news_author_name:'',
    news_author_email: ''
  };

  userObj:User;
  
  constructor(
    private newsService: NewsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  openNewsDialog() {
    this.isNewsDialogOpen = true;
  }
  closeNewsDialog() {
    this.isNewsDialogOpen = false;
  }



  onSubmitCreateNews() {
    this.newsObj.news_author_id = this.authService.userKey;
    this.newsObj.news_author_photo_url = this.authService.userObj.user_photo_url;
    this.newsObj.news_author_name = this.authService.userObj.user_name;
    this.newsObj.news_author_email = this.authService.userObj.user_email;
  
    this.newsService.addNewsObj(this.newsObj);
    this.closeNewsDialog();
  }
}
