import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Affiliate } from 'src/app/shared/models/affiliate.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AffiliatesService {
  private appUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.appUrl = environment.url;
    this.apiUrl = 'api/controller/affiliates/'
  }

  getAffiliates(): Observable<Affiliate[]>{
    console.log(this.appUrl + this.apiUrl);
    return this.http.get<Affiliate[]>(`${this.appUrl}${this.apiUrl}`);  
  }

  addAffiliate(affiliate: Affiliate): Observable<void>{
    return this.http.post<void>(`${this.appUrl}${this.apiUrl}`, affiliate)
  }

  getAffiliateById(id: number): Observable<Affiliate>{
    return this.http.get<Affiliate>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  updateAffiliate(id: number, affiliate: Affiliate): Observable<any>{
    return this.http.put<any>(`${this.appUrl}${this.apiUrl}`, affiliate)
  }

  deleteAffiliateById(id: number): Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.appUrl}${this.apiUrl}${id}`, {observe: 'response'})
  }
}
