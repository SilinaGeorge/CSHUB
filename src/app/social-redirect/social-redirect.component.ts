import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { ActivatedRoute  } from '@angular/router';
import { Error } from '../store/models/error.model';
import { GetSocialUserAction } from '../store/actions/user.actions';
import { Observable } from 'rxjs';
import { SocialMediaAuth } from '../store/models/auth.model';
import { take } from 'rxjs/operators';

/* this page is used as a callback to social media login (facebook,google)
   param is the id of the social media user that is trying to login, this will then send back
   the user id to the backend which will get the user details and send it back and store it in ngrx
*/
@Component({
  selector: 'app-social-redirect',
  templateUrl: './social-redirect.component.html',
  styleUrls: ['./social-redirect.component.css']
})
export class SocialRedirectComponent implements OnInit {

  id : string;
  user: SocialMediaAuth = {_id: null};
  error$: Observable<Error>;

  constructor(private store: Store<AppState>, private activatedroute: ActivatedRoute) { 
    
    this.activatedroute.paramMap.pipe(take(1)).subscribe(params => {
      this.id = params.get("id")
    })

    this.user._id = this.id;

    this.store.dispatch(new GetSocialUserAction(this.user));    
  }

  ngOnInit() {}

}
