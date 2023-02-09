import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserVerificationPageComponent} from './pages/user-verification-page/user-verification-page.component'
import {DemoInputFormComponent} from './demo-input-form/demo-input-form.component'
import {AuthPageComponent} from './pages/auth-page/auth-page.component'
import {HomePageComponent} from './pages/home-page/home-page.component'
import {AngularFireAuthGuard, AngularFireAuthGuardModule} from '@angular/fire/compat/auth-guard'
import {AuthGuard} from './shared/guard/auth.guard'
import {redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component:  HomePageComponent
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'my',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children : [
      {
        path: '',
        redirectTo: 'event-verification',
        pathMatch: 'full'
      },
      {
        path: 'event-verification',
        children: [
          {
            path: ':event-id',
            component: UserVerificationPageComponent
          }
        ]
      }
    ]
  },
  {
    path: 'demo-input',
    component: DemoInputFormComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
