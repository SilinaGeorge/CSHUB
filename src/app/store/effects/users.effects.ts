import { Injectable } from "@angular/core";

import { createEffect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";
import {
  UpdateSpotifyAction,
  UpdateSpotifyErrorAction,
  UpdateSpotifySuccessAction,
  LoginUserSuccessAction,
  UserActionTypes,
  LoginUserAction,
  LoginUserErrorAction,
  SignupUserAction,
  SignupUserSuccessAction,
  SignupUserErrorAction,
  GetSocialUserAction,
  GetSocialUserSuccessAction,
  GetSocialUserErrorAction,
  AddNotifAction,
  AddNotifActionSuccessAction,
  AddNotifActionErrorAction,
  LogoutUserAction,
  LogoutUserSuccessAction,
  LogoutUserErrorAction,
  GetSpotifyAction,
  GetSpotifySuccessAction,
  GetSpotifyErrorAction,
  GetNotifsAction,
  GetNotifsActionSuccessAction,
  GetNotifsActionErrorAction,
  GetSpaceLeftAction,
  GetSpaceLeftActionSuccessAction,
  GetSpaceLeftActionErrorAction,
  DeleteNotifsActionSuccessAction,
  DeleteNotifsActionErrorAction,
  DeleteNotifsAction,
} from "../actions/user.actions";
import { AuthService } from "../../services/auth.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { WidgetService } from "../../services/widget.service";
import { UserService } from "src/app/services/user.service";

@Injectable()
export class UsersEffects {
  // @createEffect() loginUser = this.actions$
  //     .pipe(
  //         ofType<LoginUserAction>(UserActionTypes.LOGIN_USER),
  //         mergeMap(
  //             data => this.authService.loginUser(data.payload)
  //                 .pipe(
  //                     map(data => {
  //                         sessionStorage.setItem("user", JSON.stringify(data));

  //                         this.router.navigateByUrl('/login-home')
  //                         return new LoginUserSuccessAction(data)
  //                     }),
  //                     catchError((error) => {
  //                         return of(new LoginUserErrorAction(error.error))
  //                     }
  //                     )
  //                 )
  //         )
  //     )

  loginUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.LOGIN_USER),
      mergeMap((data: any) =>
        this.authService.loginUser(data.payload).pipe(
          map((data) => {
            sessionStorage.setItem("user", JSON.stringify(data));

            this.router.navigateByUrl("/login-home");
            return new LoginUserSuccessAction(data);
          }),
          catchError((error) => {
            return of(new LoginUserErrorAction(error.error));
          })
        )
      )
    );
  });

//   @createEffect() getSocialUser = this.actions$.pipe(
//     ofType<GetSocialUserAction>(UserActionTypes.GET_SOCIAL_USER),
//     mergeMap((data) =>
//       this.authService.getSocialMediaUserInfo(data.payload).pipe(
//         map((data) => {
//           sessionStorage.setItem("user", JSON.stringify(data));
//           this.router.navigateByUrl("/login-home");
//           return new GetSocialUserSuccessAction(data);
//         }),
//         catchError((error) => {
//           this.router.navigateByUrl("/");
//           return of(new GetSocialUserErrorAction(error.error));
//         })
//       )
//     )
//   );


  
  getSocialUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.GET_SOCIAL_USER),
      mergeMap((data:any) =>
      this.authService.getSocialMediaUserInfo(data.payload).pipe(
        map((data) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          this.router.navigateByUrl("/login-home");
          return new GetSocialUserSuccessAction(data);
        }),
        catchError((error) => {
          this.router.navigateByUrl("/");
          return of(new GetSocialUserErrorAction(error.error));
        })
      )
    )
    );
  });

//   @createEffect() signupUser = this.actions$.pipe(
//     ofType<SignupUserAction>(UserActionTypes.SIGNUP_USER),
//     mergeMap((data) =>
//       this.authService.signupUser(data.payload).pipe(
//         map((data) => {
//           sessionStorage.setItem("user", JSON.stringify(data));
//           this.router.navigateByUrl("/login-home");
//           return new SignupUserSuccessAction(data);
//         }),
//         catchError((error) => {
//           return of(new SignupUserErrorAction(error.error));
//         })
//       )
//     )
//   );

  signupUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.SIGNUP_USER),
      mergeMap((data:any) =>
      this.authService.signupUser(data.payload).pipe(
        map((data) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          this.router.navigateByUrl("/login-home");
          return new SignupUserSuccessAction(data);
        }),
        catchError((error) => {
          return of(new SignupUserErrorAction(error.error));
        })
      )
    )
    );
  });


//   @createEffect() UpdateSpotify = this.actions$.pipe(
//     ofType<UpdateSpotifyAction>(UserActionTypes.UPDATE_SPOTIFY),
//     mergeMap((data) =>
//       this.widgetService.PatchSpotify(data.payload).pipe(
//         map((data) => {
//           return new UpdateSpotifySuccessAction(data);
//         }),
//         catchError((error) => {
//           return of(new UpdateSpotifyErrorAction(error.error));
//         })
//       )
//     )
//   );


  UpdateSpotify = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.UPDATE_SPOTIFY),
      mergeMap((data:any) =>
      this.widgetService.PatchSpotify(data.payload).pipe(
        map((data) => {
          return new UpdateSpotifySuccessAction(data);
        }),
        catchError((error) => {
          return of(new UpdateSpotifyErrorAction(error.error));
        })
      )
    )
    );
  });

//   @createEffect() GetSpotify = this.actions$.pipe(
//     ofType<GetSpotifyAction>(UserActionTypes.GET_SPOTIFY),
//     mergeMap((data) =>
//       this.widgetService.GetSpotify(data.payload).pipe(
//         map((data) => {
//           return new GetSpotifySuccessAction(data);
//         }),
//         catchError((error) => {
//           return of(new GetSpotifyErrorAction(error.error));
//         })
//       )
//     )
//   );

  GetSpotify = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.GET_SPOTIFY),
      mergeMap((data:any) =>
      this.widgetService.GetSpotify(data.payload).pipe(
        map((data) => {
          return new GetSpotifySuccessAction(data);
        }),
        catchError((error) => {
          return of(new GetSpotifyErrorAction(error.error));
        })
      )
    )
    );
  });


//   @createEffect() AddNotif = this.actions$.pipe(
//     ofType<AddNotifAction>(UserActionTypes.ADD_NOTIF),
//     mergeMap((data) =>
//       this.widgetService.PutNotif(data.payload).pipe(
//         map((data) => {
//           return new AddNotifActionSuccessAction(data);
//         }),
//         catchError((error) => {
//           return of(new AddNotifActionErrorAction(error.error));
//         })
//       )
//     )
//   );

  AddNotif  = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.ADD_NOTIF),
      mergeMap((data:any) =>
      this.widgetService.PutNotif(data.payload).pipe(
        map((data) => {
          return new AddNotifActionSuccessAction(data);
        }),
        catchError((error) => {
          return of(new AddNotifActionErrorAction(error.error));
        })
      )
    )
    );
  });


//   @createEffect() DeleteNotif = this.actions$.pipe(
//     ofType<DeleteNotifsAction>(UserActionTypes.DELETE_NOTIFS),
//     mergeMap((data) =>
//       this.widgetService.DeleteNotifs(data.payload).pipe(
//         map((data) => {
//           return new DeleteNotifsActionSuccessAction(data);
//         }),
//         catchError((error) => {
//           return of(new DeleteNotifsActionErrorAction(error.error));
//         })
//       )
//     )
//   );

  DeleteNotif  = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.DELETE_NOTIFS),
      mergeMap((data:any) =>
      this.widgetService.DeleteNotifs(data.payload).pipe(
        map((data) => {
          return new DeleteNotifsActionSuccessAction(data);
        }),
        catchError((error) => {
          return of(new DeleteNotifsActionErrorAction(error.error));
        })
      )
    )
    );
  });


//   @createEffect() GetNotif = this.actions$.pipe(
//     ofType<GetNotifsAction>(UserActionTypes.GET_NOTIFS),
//     mergeMap((data) =>
//       this.widgetService.GetNotifs(data.payload).pipe(
//         map((data) => {
//           return new GetNotifsActionSuccessAction(data);
//         }),
//         catchError((error) => {
//           return of(new GetNotifsActionErrorAction(error.error));
//         })
//       )
//     )
//   );

  GetNotif  = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.GET_NOTIFS),
      mergeMap((data:any) =>
      this.widgetService.GetNotifs(data.payload).pipe(
        map((data) => {
          return new GetNotifsActionSuccessAction(data);
        }),
        catchError((error) => {
          return of(new GetNotifsActionErrorAction(error.error));
        })
      )
    )
    );
  });

//   @createEffect() logout = this.actions$.pipe(
//     ofType<LogoutUserAction>(UserActionTypes.LOGOUT_USER),
//     mergeMap((data) =>
//       this.authService.logoutUser().pipe(
//         map((data) => {
//           this.router.navigateByUrl("/");
//           return new LogoutUserSuccessAction();
//         }),
//         catchError((error) => {
//           this.router.navigateByUrl("/");
//           return of(new LogoutUserErrorAction(error.error));
//         })
//       )
//     )
//   );

  logout  = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.LOGOUT_USER),
      mergeMap((data:any) =>
      this.authService.logoutUser().pipe(
        map((data) => {
          this.router.navigateByUrl("/");
          return new LogoutUserSuccessAction();
        }),
        catchError((error) => {
          this.router.navigateByUrl("/");
          return of(new LogoutUserErrorAction(error.error));
        })
      )
    )
    );
  });


//   @createEffect() GetSpaceLeft = this.actions$.pipe(
//     ofType<GetSpaceLeftAction>(UserActionTypes.GET_SPACE_LEFT),
//     mergeMap((data) =>
//       this.userService.GetSpaceLeft(data.payload).pipe(
//         map((data) => {
//           return new GetSpaceLeftActionSuccessAction(data);
//         }),
//         catchError((error) => {
//           return of(new GetSpaceLeftActionErrorAction(error.error));
//         })
//       )
//     )
//   );

  GetSpaceLeft  = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.GET_SPACE_LEFT),
      mergeMap((data:any) =>
      this.userService.GetSpaceLeft(data.payload).pipe(
        map((data) => {
          return new GetSpaceLeftActionSuccessAction(data);
        }),
        catchError((error) => {
          return of(new GetSpaceLeftActionErrorAction(error.error));
        })
      )
    )
    );
  });


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private widgetService: WidgetService,
    private userService: UserService,
    private router: Router
  ) {}
}
