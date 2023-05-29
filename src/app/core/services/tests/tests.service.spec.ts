import { TestBed } from '@angular/core/testing';

import { TestsService } from './tests.service';
import { HttpClient } from '@angular/common/http';

describe('TestsService', () => {
  let service: TestsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new TestsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
