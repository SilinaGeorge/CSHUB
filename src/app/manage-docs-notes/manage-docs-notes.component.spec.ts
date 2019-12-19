import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocsNotesComponent } from './manage-docs-notes.component';

describe('ManageDocsNotesComponent', () => {
  let component: ManageDocsNotesComponent;
  let fixture: ComponentFixture<ManageDocsNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDocsNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocsNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
