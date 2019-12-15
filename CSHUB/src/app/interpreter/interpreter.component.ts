import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/models/app-state.model';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Topics } from '../topics';

@Component({
  selector: 'app-interpreter',
  templateUrl: './interpreter.component.html',
  styleUrls: ['./interpreter.component.css']
})
export class InterpreterComponent implements OnInit {

  private topic = null

  constructor(private store: Store<AppState>, private activatedroute: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.activatedroute.paramMap.pipe(take(1)).subscribe(params => {
      this.topic = params.get("topic")

      if (this.topic == undefined || !Topics.includes(this.topic) || this.topic =='Other') this.router.navigate(['/login-home'])
    })
  }

}
