import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  targeturl = "http://localhost:3331/api/v1/turnos/"
  constructor(private httpClient:HttpClient) { }
  public list() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.targeturl+"getAll");
  }
  public create(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"registrarTurno",request).pipe(map(res => res ));
  }
}
