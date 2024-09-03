import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AlumnoComponent } from '../../entities/Alumnos/alumno/alumno.component';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private httpClient:HttpClient) { }
  targeturl = "http://localhost:3331/api/v1/alumnos/"
  public getById(request:string) : Observable<any>{
    return this.httpClient.get<any>(this.targeturl+'getByIdUser/'+request).pipe(map (res => res));
  }
  public list():Observable<AlumnoComponent[]>{
    return this.httpClient.get<AlumnoComponent[]>(this.targeturl+"getAll");
  }
}
