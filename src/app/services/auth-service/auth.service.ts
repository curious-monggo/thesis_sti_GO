import { Injectable } from '@angular/core';

//auth
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';

//model
import { User } from '../../models/user/user';

//Router
import { Router } from '@angular/router';

//user service<secondary>
import { UserService } from '../user-service/user.service';


//components
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState;
  user_name;
  userKey;

  userObj: User = {
    user_name: '',
    user_email:'',
    user_photo_url: ''
  };


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,


    private newsCardComponent: NewsCardComponent
  ) {
      this.checkAuth();
   }
   checkAuth() {
    this.afAuth.authState.subscribe((user) => {
      if(user) {
        this.userObj.user_name = user.displayName;
        this.userObj.user_email = user.email;
        this.userObj.user_photo_url = user.photoURL;
        this.userKey = user.uid;
        
        console.log(user);
        this.userService.addUserObj(this.userKey, this.userObj);
        this.router.navigateByUrl('/news');
      } 
      else {
        this.user_name = null;
        this.router.navigateByUrl('/login');
      }
    }); 
  }
  // getUserID(key:string){

  // }
  facebookLogin(){
    const provider = new auth.FacebookAuthProvider();
    return this.socialLogin(provider);
  }
  googleLogin(){
    const provider = new auth.GoogleAuthProvider();
    return this.socialLogin(provider);
  }
  private socialLogin(provider){
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        
        this.userObj.user_name = this.authState.displayName;
        this.userObj.user_email = this.authState.email;
        this.userObj.user_photo_url = this.authState.photoURL;
       

      })
      .catch(error => console.log(error));
  }
  logOut(){
    //need to wrap in an if for catching undefined values
    this.newsCardComponent.newsListSubscription.unsubscribe();
    this.userService.userObjSubscription.unsubscribe();
    this.afAuth.auth.signOut();
    
    this.router.navigateByUrl('/');
  }
}
