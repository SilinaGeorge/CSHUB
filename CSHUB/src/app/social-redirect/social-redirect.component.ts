import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { ActivatedRoute  } from '@angular/router';
import { User } from '../store/models/user.model';
import { Error } from '../store/models/error.model';
import { GetSocialUserAction } from '../store/actions/user.actions';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { SocialMediaAuth } from '../store/models/auth.model';

@Component({
  selector: 'app-social-redirect',
  templateUrl: './social-redirect.component.html',
  styleUrls: ['./social-redirect.component.css']
})
export class SocialRedirectComponent implements OnInit {

  id : string;
  user: SocialMediaAuth = {_id: null};
  error$: Observable<Error>;

  constructor(private store: Store<AppState>, private activatedroute: ActivatedRoute, private router: Router) {


    
   }

  ngOnInit() {

    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get("id")
    })

    this.user._id = this.id;

    this.store.dispatch(new GetSocialUserAction(this.user));    
  }

}
