import { TestBed } from '@angular/core/testing';

import { CdlService } from './cdl.service';

describe('CdlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CdlService = TestBed.get(CdlService);
    expect(service).toBeTruthy();
  });
});
