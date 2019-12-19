import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDocsDialogBoxComponent } from './notes-docs-dialog-box.component';

describe('NotesDocsDialogBoxComponent', () => {
  let component: NotesDocsDialogBoxComponent;
  let fixture: ComponentFixture<NotesDocsDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesDocsDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDocsDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
