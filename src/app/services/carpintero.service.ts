import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarpinteroService {

  url_default: string = 'carpintero/'

  constructor(
    private http: HttpClient
  ) { }
  getBuscarCapinteroFiltros(data_form): Observable <any> {
    return this.http.post<any>(`${environment.URL_API}${this.url_default}buscar`, data_form);
  }
  getCarpinteroById(carpintero_id): Observable <any> {
    return this.http.get<any>(`${environment.URL_API}${this.url_default}${carpintero_id}`);
  }
  postVerificarCarpinteroFiltro(data_form): Observable <any> {
    return this.http.post<any>(`${environment.URL_API}${this.url_default}verificar-filtro`, data_form);
  }
  postActualizarCarpintero(data_form): Observable <any> {
    return this.http.post<any>(`${environment.URL_API}${this.url_default}actualizar-carpintero`, data_form);
  }
  postReenviarEmailConfirmacionCuenta(data_form): Observable <any> {
    return this.http.post<any>(`${environment.URL_API}${this.url_default}reenviar-email-confirmacion-cuenta`, data_form);
  }
}
