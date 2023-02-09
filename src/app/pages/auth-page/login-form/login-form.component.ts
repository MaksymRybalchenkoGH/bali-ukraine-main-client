import { Component } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(public authService: AuthService) {
  }

  // .then((userCredential) => {
  // // Signed in
  //   const user = userCredential.user;
  // }).catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });

}
