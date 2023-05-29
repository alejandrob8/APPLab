import { TestBed } from '@angular/core/testing';

import { AffiliatesService } from './affiliates.service';
import { HttpClient } from '@angular/common/http';
import { Affiliate } from 'src/app/shared/models/affiliate.model';
import { of } from 'rxjs';

describe('AffiliatesService', () => {
  let service: AffiliatesService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockAffiliates: Affiliate[] = [ 
    {id: 1, name: "Julian", age: 35, mail:"julian@yopmail.com"},
    {id: 2, name: "Juan", age: 21, mail:"juan@yopmail.com"},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new AffiliatesService(httpClientSpy as any);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve affiliates from the backend', () => { 
    
    httpClientSpy.get.and.returnValue(of(mockAffiliates)); 
    service.getAffiliates().subscribe(affiliates => { 
      expect(affiliates).toEqual(mockAffiliates); 
    }); 
    expect(httpClientSpy.get).toHaveBeenCalledWith('http://localhost:8080/api/controller/affiliates/'); 
  });

});
