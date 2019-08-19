import { Component, OnInit, ViewChild } from '@angular/core';
import { ParallaxScrollModule} from 'ng2-parallaxscroll';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

}
