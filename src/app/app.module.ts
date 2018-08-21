import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//components
import { AppComponent } from './app.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ProgramsPageComponent } from './pages/programs-page/programs-page.component';
import { ProgramsCardComponent } from './components/programs-card/programs-card.component';

//Routes
import { RouterModule, Routes} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

//angularFire
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { AngularFireAuthModule } from 'angularfire2/auth';

//services
import { AuthService } from './services/auth-service/auth.service';


//Form
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './pages/user-page/user-page.component';



  const appRoutes: Routes = [
    {
      path:'',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginPageComponent
    },
    {
      path: 'news',
      component: NewsPageComponent
    },
    {
      path: 'programs',
      component: ProgramsPageComponent
    },
    {
      path: '**',
      component: PageNotFoundComponent,
      pathMatch: 'full'
    }
  ];

  export const firebaseConfig = {
    apiKey: "AIzaSyD6Rg5ux3fQi3OrwrWCHAEipaxrk3hB7EY",
    authDomain: "stigo-6d063.firebaseapp.com",
    databaseURL: "https://stigo-6d063.firebaseio.com",
    projectId: "stigo-6d063",
    storageBucket: "stigo-6d063.appspot.com",
    messagingSenderId: "510666125923"
  };
  
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    NewsPageComponent,
    NavbarComponent,
    NewsCardComponent,
    ProgramsPageComponent,
    ProgramsCardComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [AuthService, AngularFireDatabase, NewsCardComponent, ProgramsCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
