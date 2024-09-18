import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MenuComponent } from '../../entities/Menus/menu/menu.component';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  targeturl = environment.api_url+ "api/v1/menus/"
  constructor(private httpClient:HttpClient) { }
  public createMenu(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"createMenu",request).pipe(map(res => res ));
  }

  public addPlatos(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"AddPlatos",request).pipe(map(res => res ));
  }

  public DeletePlatos(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"DeletePlatos",request).pipe(map(res => res ));
  }

  public addTurnos(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"AddTurnos",request).pipe(map(res => res ));
  }
  
  public DeleteTurnos(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targeturl+"DeleteTurnos",request).pipe(map(res => res ));
  }

  public getAll() : Observable<MenuComponent[]>{
    return this.httpClient.get<MenuComponent[]>(this.targeturl+"getAll");
  }


}
