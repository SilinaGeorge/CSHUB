import { Component, OnInit, ViewChild } from '@angular/core';
import { ParallaxScrollModule} from 'ng2-parallaxscroll';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';

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


  constructor() {
  }

  ngOnInit() {
  }

}
