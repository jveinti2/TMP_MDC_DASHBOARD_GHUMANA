import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Functions } from '../utils/functions';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private functions: Functions) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem(environment.TOKEN_NAME)) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem(environment.TOKEN_NAME),
          AppUrl: environment.URL_SERVE_REGISTRO
        }
      });
    }
    return next.handle(request).pipe(catchError((error, caught) => {
        this.handleAuthError(error);
        return of(error);
      }) as any);
  }
  private handleAuthError(err: HttpErrorResponse | any): Observable<any> {
    if(err.status == 500){
      this.functions.messageAlert('error', 'Error', err.error.MSG);
      return of(err.MSG);
    }
    if(err.status == 404) {
      this.functions.messageAlert('error', 'Error', err.error.message);
      return of(err.message);
    }
    if(err.status == 401 || err.status == 403 || err.status == 400) {
      this.authService.logout();
      this.router.navigate(['inicio-sesion']);
      this.functions.messageAlert('error', 'Error', err.error.message);
      return of(err.message);
    }
    throw err;
  }
}
