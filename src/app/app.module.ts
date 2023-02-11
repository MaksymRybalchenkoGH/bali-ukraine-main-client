import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
// import { provideFunctions,getFunctions } from '@angular/fire/functions';
// import { provideMessaging,getMessaging } from '@angular/fire/messaging';
// import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import {AngularFireModule} from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoInputFormComponent } from './demo-input-form/demo-input-form.component'
import {ReactiveFormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {QRCodeModule} from 'angularx-qrcode';
import { UserVerificationPageComponent } from './pages/user-verification-page/user-verification-page.component'
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginFormComponent } from './pages/auth-page/login-form/login-form.component'
import {AuthService} from './shared/services/auth.service';
import { HomePageComponent } from './pages/home-page/home-page.component'
import {AngularFireAuthGuardModule} from '@angular/fire/compat/auth-guard'
import {FirebaseInteractionService} from './shared/services/firebase-interaction.service'


@NgModule({
  declarations: [
    AppComponent,
    DemoInputFormComponent,
    UserVerificationPageComponent,
    AuthPageComponent,
    LoginFormComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // provideFunctions(() => getFunctions()),
    // provideMessaging(() => getMessaging()),
    // provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    QRCodeModule
  ],
  providers: [
    // ScreenTrackingService,UserTrackingService
    AuthService,
    FirebaseInteractionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// add users list to firestore
// generate QR for each user add to spreadsheets


// test
// UI
// store QR images in storage & sync with firestore
