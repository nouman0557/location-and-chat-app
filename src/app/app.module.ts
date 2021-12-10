import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { HomeComponent } from './home/home.component';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';
import { LocationWatchingComponent } from './location-watching/location-watching.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserHttpService } from './http/user-http.service';
import { TokenInterceptor } from './http/token-interreceptor.service';
import { AuthGuard } from './services/auth-guard.service';
import { CommonService } from './services/common.service';
import { AngularComponentComponent } from './angular-component/angular-component.component';
import { GoogleMapsModule } from '@angular/google-maps';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FireBaseDataService } from './services/firebase-data.service';
import { FirebaseCurdComponent } from './firebase-curd/firebase-curd.component';
import { TrackLocationComponent } from './track-location/track-location.component';
import { WindowService } from './services/window.service';
import { RecaptchaFormsModule, RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";

@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent,
    HomeComponent,
    LocationTrackingComponent,
    LocationWatchingComponent,
    LoginRegisterComponent,
    NavBarComponent,
    AngularComponentComponent,
    FirebaseCurdComponent,
    TrackLocationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GoogleMapsModule,
    RecaptchaModule,
    RecaptchaFormsModule
    // AngularFireModule.initializeApp({
    //   apiKey: "AIzaSyA2clufa-g8U9QWAOJi7C52xZkNuVyaTuE",
    //   authDomain: "my-project-first-330812.firebaseapp.com",
    //   projectId: "my-project-first-330812",
    //   storageBucket: "my-project-first-330812.appspot.com",
    //   messagingSenderId: "397327658572",
    //   appId: "1:397327658572:web:262bc72d51ce68cf660ee9",
    //   measurementId: "G-0TRK4054R4"
    // }),
    // AngularFirestoreModule
  ],
  providers: [
    UserHttpService,
    CommonService,
    AuthGuard,
    FireBaseDataService,
    WindowService,
    ReCaptchaV3Service,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LeayJAdAAAAABaVJG4QfS_yOy6lSjA16C_XsMAG" }
  ],
  exports: [RecaptchaModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
