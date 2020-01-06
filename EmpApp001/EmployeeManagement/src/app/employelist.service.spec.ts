import { TestBed } from '@angular/core/testing';

import { EmployelistService } from './employelist.service';

describe('EmployelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployelistService = TestBed.get(EmployelistService);
    expect(service).toBeTruthy();
  });
});
