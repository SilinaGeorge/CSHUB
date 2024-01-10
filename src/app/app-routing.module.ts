import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginHomeComponent } from './login-home/login-home.component';
import { EditorComponent} from './editor/editor.component';
import { SocialRedirectComponent } from './social-redirect/social-redirect.component'
import { DocViewerComponent } from './doc-viewer/doc-viewer.component'
import {BadRouteComponent} from './bad-route/bad-route.component'
import {ManageDocsNotesComponent} from './manage-docs-notes/manage-docs-notes.component'
import {InterpreterComponent} from './interpreter/interpreter.component'
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path:'login-home', component: LoginHomeComponent, canActivate:[AuthGuard]},
  { path:'editor', component: EditorComponent, canActivate:[AuthGuard]},
  { path:'social-redirect', component: SocialRedirectComponent},
  { path:'doc-viewer', component: DocViewerComponent, canActivate:[AuthGuard]},
  { path:'manage-docs-notes', component: ManageDocsNotesComponent, canActivate:[AuthGuard]},
  { path:'interpreter/:topic', component: InterpreterComponent, canActivate:[AuthGuard]},
  { path:'**', component: BadRouteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
