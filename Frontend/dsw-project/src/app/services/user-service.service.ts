import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map ,Observable, tap, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserComponent } from '../entities/user/user.component';
import { UserDataComponent } from '../entities/user/user-data/user-data.component';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  targetUrl=environment.api_url+'auth/'
  currentUserLoginOn : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  currentUserJwt:BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserRole:BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserId:BehaviorSubject<String> = new BehaviorSubject<String>("");
  constructor(private httpClient:HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("jwt")!=null);
    this.currentUserJwt = new BehaviorSubject<String> (sessionStorage.getItem("jwt") || "");
    this.currentUserRole = new BehaviorSubject<String> (sessionStorage.getItem("user_role") || "");
    this.currentUserId = new BehaviorSubject<String>(sessionStorage.getItem("user_data") || '');
    
   }
  public login(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targetUrl+'login',request).pipe(
      tap((userData) => {
        sessionStorage.setItem("jwt",userData.jwt);
        sessionStorage.setItem("user_role",userData.user.userType);
        sessionStorage.setItem("user_data",userData.user.idUsuario);
        this.currentUserJwt.next(userData.jwt);
        this.currentUserRole.next(userData.user.userType)
        this.currentUserId.next(userData.user.idUsuario);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => (userData)),
      catchError(this.handleError)
    );
  }
  public Register(request:any) : Observable<any>{
    return this.httpClient.post<any>(this.targetUrl+'v2/register',request).pipe(
      map((userData) => (userData)),
      catchError(this.handleError)
    );
  }
  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
  public logout():void{
    sessionStorage.removeItem("jwt"); 
    sessionStorage.removeItem("user_data"); 
    sessionStorage.removeItem("user_role");
    this.currentUserLoginOn.next(false);
  }

  get userData():Observable<any>{
    return this.currentUserJwt.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserJwt.value;
  }
  get userRole():String{
    return this.currentUserRole.value;
  }
  get myuserData():any{
    return this.currentUserId.value;
  }
}
