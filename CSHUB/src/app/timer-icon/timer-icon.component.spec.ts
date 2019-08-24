import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerIconComponent } from './timer-icon.component';

describe('TimerIconComponent', () => {
  let component: TimerIconComponent;
  let fixture: ComponentFixture<TimerIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
