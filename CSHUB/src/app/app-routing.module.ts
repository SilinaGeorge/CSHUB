import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { LoginHomeComponent } from './login-home/login-home.component';



const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path:'about', component: AboutComponent},
  { path:'login-home', component: LoginHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
