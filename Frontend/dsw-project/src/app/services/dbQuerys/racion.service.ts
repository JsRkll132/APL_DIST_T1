import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RacionComponent } from '../../entities/Raciones/racion/racion.component';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RacionService {
  targeturl = environment.api_url+ "api/v1/Raciones/"
  constructor(private httpClient:HttpClient) { }
  public create(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"createRacion",request).pipe(map(res => res ));
  }
  public list() : Observable<RacionComponent[]>{
    return this.httpClient.get<RacionComponent[]>(this.targeturl+"getAll");
  }

  public delete(request: string): Observable<string> {
    return this.httpClient.get(this.targeturl + "deleteRacion/" + request, { responseType: 'text' });
  }
}
