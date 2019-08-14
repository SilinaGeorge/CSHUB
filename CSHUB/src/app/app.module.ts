import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';



import { MatCheckboxModule,MatInputModule, MatButtonModule, MatSelectModule, MatIconModule,  MatSidenavModule } from '@angular/material';

import { LoginService } from './services/login.service'
import { SignupService } from "./services/signup.service"


@NgModule({
  declarations: [
    AppComponent,
    SideNavMenuComponent,
    HomeComponent,
    SignupComponent,
    NavMenuComponent,
    LoginComponent,
    AboutComponent,
  ],
  imports: [
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
    LoginService, 
    SignupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
