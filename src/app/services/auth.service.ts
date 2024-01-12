import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/i-usuario';
import { Functions } from '../utils/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private functions: Functions) { }

  public login(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${environment.URL_API}usuarios/login`, {
      email: email,
      password: password
    }, {
      headers: this.getHeaders()
    }).pipe(
      catchError((e: any) => {
        if(e.status == 400){
          return throwError(e);
        }
        this.functions.messageAlert('error', 'Error', e.error.message);
        return throwError(e);
      })
    );
  }
  public logout(){
    localStorage.removeItem(environment.TOKEN_NAME);
  }
  public getDataLogin(): any {
    const data_usuario: IUsuario = decode(localStorage.getItem(environment.TOKEN_NAME));;
    return data_usuario;
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.TOKEN_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }
  public isGetAccess(c_option_to_access): boolean {
    return this.getDataLogin().array_option_access.includes(c_option_to_access);
  }
  public getHeaders(): any {
    let content_header: any = {
      'Content-Type': 'application/json'
    }
    if(localStorage.getItem(environment.TOKEN_NAME) != null){
      content_header.authorization = localStorage.getItem(environment.TOKEN_NAME)
    }
    return new HttpHeaders(content_header);
  }

}
