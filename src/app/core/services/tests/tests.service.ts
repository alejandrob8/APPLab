import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from 'src/app/shared/models/test.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class TestsService {
  private appUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.appUrl = environment.url;
    this.apiUrl = 'api/controller/tests/'
  }

  getTests(): Observable<Test[]>{
    console.log(this.appUrl + this.apiUrl);
    return this.http.get<Test[]>(`${this.appUrl}${this.apiUrl}`);  
  }

  addTest(test: Test): Observable<void>{
    return this.http.post<void>(`${this.appUrl}${this.apiUrl}`, test)
  }

  getTestById(id: number): Observable<Test>{
    return this.http.get<Test>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  updateTest(id: number, test: Test): Observable<any>{
    return this.http.put<any>(`${this.appUrl}${this.apiUrl}`, test)
  }

  deleteTestById(id: number): Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.appUrl}${this.apiUrl}${id}`, {observe: 'response'})
  }
}
