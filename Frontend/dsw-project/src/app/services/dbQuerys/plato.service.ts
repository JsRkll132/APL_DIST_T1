import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  targeturl = environment.api_url+ "api/v1/platos/"
  constructor(private httpClient:HttpClient) { }
  public list() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.targeturl+"getAll");
  }
  public create(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"createPlato",request).pipe(map(res => res ));
  }
  public update(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"editPlato",request).pipe(map(res => res ));
  }
}
