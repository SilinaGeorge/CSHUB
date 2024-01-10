// libraries
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeadroomModule } from "@ctrl/ngx-headroom";
import { CountdownModule } from "ngx-countdown";
import { MccSpeedDialModule} from 'material-community-components/speed-dial';
import { NgxSummernoteModule } from "ngx-summernote";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgxDocViewerModule } from "ngx-doc-viewer";
import { AppRoutingModule } from "./app-routing.module";

//components
import { AppComponent } from "./app.component";
import { SideNavMenuComponent } from "./side-nav-menu/side-nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { SignupComponent } from "./signup/signup.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { LoginComponent } from "./login/login.component";
import { NotificationComponent } from "./notification/notification.component";
import { NotifDialogPopupComponent } from "./notif-dialog-popup/notif-dialog-popup.component";
import { TimerComponent } from "./timer/timer.component";
import { SpotifyComponent } from "./spotify/spotify.component";
import { SpotifyPopupComponent } from "./spotify-popup/spotify-popup.component";
import { LoginHomeComponent } from "./login-home/login-home.component";
import { TimerIconComponent } from "./timer-icon/timer-icon.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { EditorComponent } from "./editor/editor.component";
import { SocialRedirectComponent } from "./social-redirect/social-redirect.component";
import { DocViewerComponent } from "./doc-viewer/doc-viewer.component";
import { GoogleSearchComponent } from "./google-search/google-search.component";
import { TitleComponent } from "./title/title.component";
import { BadRouteComponent } from "./bad-route/bad-route.component";
import { ManageDocsNotesComponent } from "./manage-docs-notes/manage-docs-notes.component";
import { ManageNotesComponent } from "./manage-notes/manage-notes.component";
import { ManageDocsComponent } from "./manage-docs/manage-docs.component";
// import { NotesDocsDialogBoxComponent } from "./notes-docs-dialog-box/notes-docs-dialog-box.component";
import { InterpreterComponent } from "./interpreter/interpreter.component";
import { RouterModule } from '@angular/router';
import { AuthGuard } from "./auth.guard";

//directives
import { DigitOnlyDirective } from "./directives/digit-only.directive";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

//NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { UserReducer } from "./store/reducers/user.reducer";
import { NotesReducer } from "./store/reducers/notes.reducer";
import { DocsReducer } from "./store/reducers/docs.reducer";

import { UsersEffects } from "./store/effects/users.effects";
import { NotesEffects } from "./store/effects/notes.effects";
import { DocsEffects } from "./store/effects/docs.effects";



@NgModule({
  declarations: [
    AppComponent,
    SideNavMenuComponent,
    HomeComponent,
    SignupComponent,
    NavMenuComponent,
    LoginComponent,
    NotificationComponent,
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
    ManageDocsNotesComponent,
    ManageNotesComponent,
    ManageDocsComponent,
    InterpreterComponent,
    NotifDialogPopupComponent,
    // NotesDocsDialogBoxComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxSummernoteModule,
    DragDropModule,
    MccSpeedDialModule,
    NgxDocViewerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CountdownModule,
    CommonModule,
    EffectsModule.forRoot([UsersEffects, NotesEffects, DocsEffects]),
    StoreModule.forRoot({
      user: UserReducer,
      noteState: NotesReducer,
      docsState: DocsReducer
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
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,

  ],
  exports:[
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  // entryComponents: [NotifDialogPopupComponent, NotesDocsDialogBoxComponent]
})
export class AppModule { }
