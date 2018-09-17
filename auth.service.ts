import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {AppUser} from './models/app-user';
import {UserService} from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>; // store user service (observable)
  authState: any = null; // store the auth state information
  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this.user$ = afAuth.authState; // get the user information
    this.afAuth.authState.subscribe( auth => {
      this.authState = auth; // get the auth state
    });
  }
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // return url is 'returnUrl' in the query parameter map or '/'
    localStorage.setItem('returnUrl', returnUrl);
    // store the returnUrl to local storage
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    // login with google
  }
  logout() {
    this.afAuth.auth.signOut(); // sign out
  }
  async signUpWithEmail(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          const user = firebase.auth().currentUser;
          user.sendEmailVerification().then (() => {
          }); // send the verification email
        });
    } catch (e) {
      console.log(e); // log the error message
    }
  }
  loginWithEmail(email: string, password: string) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // return url is 'returnUrl' in the query parameter map or '/'
    localStorage.setItem('returnUrl', returnUrl);
    // store the returnUrl to local storage
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( user => {
        this.authState = user;
        this.router.navigate(['/']); // navigate to the homepage
      })
      .catch( error => {
        console.log(error);
        throw error;
      });
  }
  resetPassword(email: string) { // reset the password
    return this.afAuth.auth.sendPasswordResetEmail(email) // send the reset password
      .then( user => {
        this.authState = user; // get the auth state
      })
      .catch( error => {
        console.log(error); // log the error message
        throw error;
      });
  }
  get currentUserName(): string {
    return this.authState['email'];
  }
  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap( user => {
        if (user) { // if the user exists
          return this.userService.get(user.uid); // get the app user
        } else {
          return Observable.of(null); // return the null user
        }
      });
  }

}
