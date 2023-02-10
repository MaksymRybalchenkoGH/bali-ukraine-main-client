import {Injectable, NgZone} from '@angular/core'
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import {AngularFireAuth} from '@angular/fire/compat/auth'
import * as auth from 'firebase/auth'
import {Router} from '@angular/router'
import { User } from 'firebase/auth'

const USER_AUTH_LS_KEY = 'bali-ukraine-user'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // inspired by  https://www.positronx.io/full-angular-firebase-authentication-system/

  private userData: User = null

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {


    this.afAuth.authState.subscribe( (user: User) => {
      console.log('>>> constructor > this.afAuth.signInWithEmailAndPassword')
      if (user) {
        this.userData = user;
        localStorage.setItem(USER_AUTH_LS_KEY, JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem(USER_AUTH_LS_KEY)!);
      } else {
        localStorage.setItem(USER_AUTH_LS_KEY, 'null');
        // JSON.parse(localStorage.getItem(USER_AUTH_LS_KEY)!);
      }
     // get  current user (promise) await this.afAuth.currentUser
    });

  }


  public signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('>>> signIn > this.afAuth.signInWithEmailAndPassword')
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          console.log('>>> signIn > this.afAuth.authState.subscribe')
          if (user) {
            this.router.navigate(['my'])
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  public signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem(USER_AUTH_LS_KEY)
      this.router.navigate(['auth'])
    });
  }
  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(USER_AUTH_LS_KEY)!)
    return user !== null // && user.emailVerified !== false;
  }

  public googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      console.log('>>> googleAuth > this.authLogin(new auth.GoogleAuthProvider())')
      this.router.navigate(['my'])
    });
  }
  // Auth logic to run auth providers
  private authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['my'])
        this.setUserData(result.user)
      })
      .catch((error) => {
        window.alert(error)
      });
  }

  private setUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )
    const userData: User = {...user}
    return userRef.set(userData, {
      merge: true,
    });
  }
}
