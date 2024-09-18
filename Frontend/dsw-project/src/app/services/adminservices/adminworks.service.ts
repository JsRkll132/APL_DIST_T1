import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminworksService {
  targetUrl=environment.api_url+'api/v1/users/'
  constructor(private httpClient:HttpClient) { }

  public getAllUsers() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.targetUrl+'getAll');
  }
}
