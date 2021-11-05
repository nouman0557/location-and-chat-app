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
  ],
  providers: [
    UserHttpService,
    CommonService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
