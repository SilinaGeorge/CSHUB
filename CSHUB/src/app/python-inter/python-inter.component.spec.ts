import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonInterComponent } from './python-inter.component';

describe('PythonInterComponent', () => {
  let component: PythonInterComponent;
  let fixture: ComponentFixture<PythonInterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PythonInterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PythonInterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
