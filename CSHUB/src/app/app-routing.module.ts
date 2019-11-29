import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { LoginHomeComponent } from './login-home/login-home.component';
import { EditorComponent} from './editor/editor.component';
import { SocialRedirectComponent } from './social-redirect/social-redirect.component'
import { DocViewerComponent } from './doc-viewer/doc-viewer.component'
import {BadRouteComponent} from './bad-route/bad-route.component'



const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path:'about', component: AboutComponent},
  { path:'login-home', component: LoginHomeComponent},
  { path:'editor', component: EditorComponent},
  { path:'social-redirect/:id', component: SocialRedirectComponent},
  { path:'doc-viewer', component: DocViewerComponent},
  { path:'**', component: BadRouteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
