import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config_version } from "@assets/config_version";
import { environment } from "src/environments/environment";
import { Router, CanActivate } from "@angular/router";
import swal from "sweetalert2";
import { Functions } from "src/app/utils/functions";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class CacheService implements CanActivate {
  url_string: string = `${environment.URL_SERVE_REGISTRO}assets/config.json`;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private functions: Functions,
    private toastrService: ToastrService
  ) {}

  canActivate(): boolean {
    this.getCache();
    return true;
  }

  getCache() {
    let url_api =
      location.hostname == "localhost" ? this.url_string : this.url_string;
    const headers = new HttpHeaders()
      .set("Cache-Control", "no-cache")
      .set("Pragma", "no-cache");

    return this.httpClient
      .get<any>(url_api, { headers })
      .subscribe((config) => {
        if (config.version != config_version.version) {
          this.toastrService.warning(
            "Se ha detectado una nueva versión de la aplicación, se actualizará en breve.",
            "Actualización",
            {
              progressBar: true,
              progressAnimation: "increasing",
              positionClass: "toast-bottom-full-width",
              timeOut: 6000,
            }
          );
          setTimeout(() => {
            window.location.reload();
          }, 7000);
        }
      });
  }
}
