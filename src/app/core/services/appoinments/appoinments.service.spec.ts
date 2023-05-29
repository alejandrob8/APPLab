import { TestBed } from '@angular/core/testing';

import { AppoinmentsService } from './appoinments.service';
import { HttpClient } from '@angular/common/http';

describe('AppoinmentsService', () => {
  let service: AppoinmentsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new AppoinmentsService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
