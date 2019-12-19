import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPopupComponent } from './spotify-popup.component';

describe('SpotifyPopupComponent', () => {
  let component: SpotifyPopupComponent;
  let fixture: ComponentFixture<SpotifyPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
