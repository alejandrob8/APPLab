import { TestBed } from '@angular/core/testing';

import { ElementIdSharingService } from './element-id-sharing.service';

describe('ElementIdSharingService', () => {
  let service: ElementIdSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementIdSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
