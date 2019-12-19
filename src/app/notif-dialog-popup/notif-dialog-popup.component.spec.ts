import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifDialogPopupComponent } from './notif-dialog-popup.component';

describe('NotifDialogPopupComponent', () => {
  let component: NotifDialogPopupComponent;
  let fixture: ComponentFixture<NotifDialogPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifDialogPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifDialogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
