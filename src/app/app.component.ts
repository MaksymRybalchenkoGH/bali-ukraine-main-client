import {Component} from '@angular/core'
import {AuthService} from './shared/services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(private authService: AuthService, private router: Router) {}

  signOut () {
    this.authService.signOut().then(e => this.router.navigate(['home']))
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }
}
