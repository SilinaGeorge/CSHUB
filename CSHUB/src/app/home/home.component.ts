import { Component, OnInit, ViewChild } from '@angular/core';
import { ParallaxScrollModule} from 'ng2-parallaxscroll';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', 
  '../../assets/landingpage/css/noscript.css',
   '../../assets/landingpage/css/main.css',
   '../../assets/landingpage/sass/noscript.scss',
   '../../assets/landingpage/sass/main.scss'
  ],
  providers: [NgbCarouselConfig],

})



export class HomeComponent implements OnInit {

  subscription: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit() {

  this.subscription = this.store.select(store => store.user).subscribe(state =>   {
      if (state.user && state.user._id){
        this.router.navigateByUrl('/login-home')
        
      }
      }); 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
