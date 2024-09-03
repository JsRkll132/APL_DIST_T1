import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminworksService {
  targetUrl='http://localhost:3331/api/v1/users/'
  constructor(private httpClient:HttpClient) { }

  public getAllUsers() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.targetUrl+'getAll');
  }
}
