import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AlumnoComponent } from '../../entities/Alumnos/alumno/alumno.component';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private httpClient:HttpClient) { }
  targeturl =environment.api_url+ "api/v1/alumnos/"
  public getById(request:string) : Observable<any>{
    return this.httpClient.get<any>(this.targeturl+'getByIdUser/'+request).pipe(map (res => res));
  }
  public list():Observable<AlumnoComponent[]>{
    return this.httpClient.get<AlumnoComponent[]>(this.targeturl+"getAll");
  }
}
