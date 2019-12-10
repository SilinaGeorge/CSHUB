import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNotesDialogBoxComponent } from './manage-notes-dialog-box.component';

describe('ManageNotesDialogBoxComponent', () => {
  let component: ManageNotesDialogBoxComponent;
  let fixture: ComponentFixture<ManageNotesDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNotesDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNotesDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
