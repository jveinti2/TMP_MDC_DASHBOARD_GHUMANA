import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ListasService {
  url_default: string = "lista/";

  constructor(private http: HttpClient) {}

  getListaAplicaciones(): Observable<any> {
    return this.http.get<any>(
      `${environment.URL_API}${this.url_default}aplicaciones`
    );
  }

  inicioSesionApps(data_form): Observable<any> {
    return this.http.post<any>(
      `http://172.16.2.6/${data_form.url_login_app}`,
      data_form
    );
  }
}
