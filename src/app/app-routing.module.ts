import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserVerificationPageComponent} from './pages/user-verification-page/user-verification-page.component'
import {DemoInputFormComponent} from './demo-input-form/demo-input-form.component'
import {AuthPageComponent} from './pages/auth-page/auth-page.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: 'event-verification',
    children: [
      {
        path: ':event-id',
        component: UserVerificationPageComponent
      }
    ]
  },
  {
    path: 'demo-input',
    component: DemoInputFormComponent
  },
  {
    path: '**',
    redirectTo: 'event-verification',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
