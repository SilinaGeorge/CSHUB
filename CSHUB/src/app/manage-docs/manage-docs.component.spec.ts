import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocsComponent } from './manage-docs.component';

describe('ManageDocsComponent', () => {
  let component: ManageDocsComponent;
  let fixture: ComponentFixture<ManageDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
