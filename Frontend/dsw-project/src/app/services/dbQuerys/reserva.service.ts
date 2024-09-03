import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private httpClient:HttpClient) { }
  targeturl = "http://localhost:3331/api/v1/reservas/"

  public Create(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+'createReserva',request).pipe(map (res => res));
  } 
  public list() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.targeturl+"getAll");
  }
  public DeleteById(idalumno:string,idReserva:string) : Observable<any>{
    return this.httpClient.get(this.targeturl+'deleteByIdReserva/'+idalumno+'/'+idReserva, { responseType: 'text' });
  }

}
