import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRedirectComponent } from './social-redirect.component';

describe('SocialRedirectComponent', () => {
  let component: SocialRedirectComponent;
  let fixture: ComponentFixture<SocialRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
