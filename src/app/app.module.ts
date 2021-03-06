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
import { MccSpeedDialModule } from "material-community-components";
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
import { NotesDocsDialogBoxComponent } from "./notes-docs-dialog-box/notes-docs-dialog-box.component";
import { InterpreterComponent } from "./interpreter/interpreter.component";

import { AuthGuard } from "./auth.guard";

//directives
import { DigitOnlyDirective } from "./directives/digit-only.directive";

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
  MatGridListModule,
  MatPaginatorModule,
  MatSortModule
} from "@angular/material";


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
    ManageDocsNotesComponent,
    ManageNotesComponent,
    ManageDocsComponent,
    NotesDocsDialogBoxComponent,
    InterpreterComponent
  ],
  imports: [
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [NotifDialogPopupComponent, NotesDocsDialogBoxComponent]
})
export class AppModule { }
