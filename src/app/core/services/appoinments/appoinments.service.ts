import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appoinment } from 'src/app/shared/models/appoinment.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentsService {
  private appUrl: string;
  private apiUrl: string;
  private apiUrlById: string;
  private apiUrlByDate: string;
  
  constructor(private http: HttpClient) { 
    this.appUrl = environment.url;
    this.apiUrl = 'api/controller/appoinments/'
    this.apiUrlById = 'api/controller/appoinments/affiliate/'
    this.apiUrlByDate = 'api/controller/appoinments/by?date='
  }

  getAppoinments(): Observable<Appoinment[]>{
    console.log(this.appUrl + this.apiUrl);
    return this.http.get<Appoinment[]>(`${this.appUrl}${this.apiUrl}`);  
  }

  addAppoinment(appoinment: Appoinment): Observable<void>{
    return this.http.post<void>(`${this.appUrl}${this.apiUrl}`, appoinment)
  }

  getAppoinmentById(id: number): Observable<Appoinment>{
    return this.http.get<Appoinment>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  updateAppoinment(id: number, appoinment: Appoinment): Observable<any>{
    return this.http.put<any>(`${this.appUrl}${this.apiUrl}`, appoinment)
  }

  deleteAppoinmentById(id: number): Observable<any>{
    return this.http.delete<any>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  getAppoinmentByAffiliateId(id: number): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.appUrl}${this.apiUrlById}${id}`, {observe: 'response'})
    
  }

  getAppoinmentByDate(date: string): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.appUrl}${this.apiUrlByDate}${date}`, {observe: 'response'})
  }

}
