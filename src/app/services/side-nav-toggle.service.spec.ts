import { TestBed } from '@angular/core/testing';

import { SideNavToggleService } from './side-nav-toggle.service';

describe('SideNavToggleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SideNavToggleService = TestBed.get(SideNavToggleService);
    expect(service).toBeTruthy();
  });
});
