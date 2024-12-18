import { HttpClient ,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private httpClient:HttpClient) { }
  targeturl =environment.api_url+  "api/v1/reservas/"

  public Create(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+'createReserva',request).pipe(map (res => res));
  } 
  public list() : Observable<any[]>{
    return this.httpClient.get<any[]>(this.targeturl+"getAll");
  }
  public listByAlumno(idAlumno?: string): Observable<any[]> {
    // Crear los parámetros de consulta (query params)
    let params = new HttpParams().set('idAlumno', idAlumno??"");

    // Hacer la solicitud GET con parámetros
    return this.httpClient.get<any[]>(this.targeturl + "getReservaAlumno", { params });
  }
  public DeleteById(idalumno:string,idReserva:string) : Observable<any>{
    return this.httpClient.get(this.targeturl+'deleteByIdReserva/'+idalumno+'/'+idReserva, { responseType: 'text' });
  }

}
