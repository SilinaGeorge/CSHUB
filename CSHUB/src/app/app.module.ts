import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';
import { HeadroomModule } from '@ctrl/ngx-headroom';
import { CountdownModule } from 'ngx-countdown';
import { MccSpeedDialModule} from 'material-community-components'

import { NgxSummernoteModule} from 'ngx-summernote'

import { DragDropModule} from '@angular/cdk/drag-drop'



import { NgxDocViewerModule } from 'ngx-doc-viewer'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';



import { 
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTabsModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatInputModule,
   MatButtonModule, 
   MatSelectModule, 
   MatIconModule,  
   MatSidenavModule, 
   MatDialogModule,
   MatTableModule,
   MatGridListModule
  } from '@angular/material';
  


import { NotificationComponent } from './notification/notification.component';
import { NotifDialogPopupComponent } from './notif-dialog-popup/notif-dialog-popup.component';
import { TimerComponent } from './timer/timer.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { SpotifyPopupComponent } from './spotify-popup/spotify-popup.component';

import { LoginHomeComponent } from './login-home/login-home.component';

import { TimerIconComponent } from './timer-icon/timer-icon.component';
import { CountdownConfig } from 'ngx-countdown/src/countdown.config';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserReducer } from './store/reducers/user.reducer';
import { NotesReducer } from './store/reducers/notes.reducer';
import { UsersEffects } from './store/effects/users.effects';
import { NotesEffects } from './store/effects/notes.effects';


import { EditorComponent } from './editor/editor.component';
import { SocialRedirectComponent } from './social-redirect/social-redirect.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { GoogleSearchComponent } from './google-search/google-search.component';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { TitleComponent } from './title/title.component';
import { BadRouteComponent } from './bad-route/bad-route.component';
import { PythonInterComponent } from './python-inter/python-inter.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavMenuComponent,
    HomeComponent,
    SignupComponent,
    NavMenuComponent,
    LoginComponent,
    AboutComponent,
    NotificationComponent,
    NotifDialogPopupComponent,
    TimerComponent,
    SpotifyComponent,
    SpotifyPopupComponent,
    LoginHomeComponent,
    TimerIconComponent,
    LoadingSpinnerComponent,
    EditorComponent,
    SocialRedirectComponent,
    DocViewerComponent,
    GoogleSearchComponent,
    DigitOnlyDirective,
    TitleComponent,
    BadRouteComponent,
    PythonInterComponent,
  ],
  imports: [
    NgxSummernoteModule,
    DragDropModule,
    MccSpeedDialModule,
    NgxDocViewerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CountdownModule ,
    CommonModule,
    EffectsModule.forRoot([UsersEffects, NotesEffects]),
    StoreModule.forRoot({
      user: UserReducer,
      noteState: NotesReducer,

    }),
    MatGridListModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    HeadroomModule,
    MatSidenavModule,
    ParallaxScrollModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,    
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents:[NotifDialogPopupComponent,],
})
export class AppModule { }
