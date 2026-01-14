import { TestBed } from '@angular/core/testing';

import { Documentservice } from './documentservice';

describe('Documentservice', () => {
  let service: Documentservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Documentservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
