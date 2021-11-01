import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { HomeComponent } from './home/home.component';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';
import { LocationWatchingComponent } from './location-watching/location-watching.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [

  { path: 'login', component: LoginRegisterComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'chat-bot', component: ChatBoxComponent, canActivate: [AuthGuard] },

  { path: 'location-tracking', component: LocationTrackingComponent, canActivate: [AuthGuard] },

  { path: 'location-watching', component: LocationWatchingComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
