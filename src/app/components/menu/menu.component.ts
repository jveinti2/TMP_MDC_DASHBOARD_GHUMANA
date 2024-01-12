import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { IUsuario } from "src/app/interfaces/i-usuario";
import { config_version } from "@assets/config_version";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.styl"],
})
export class MenuComponent {
  version: string = config_version.version;
  auth_data: IUsuario;
  img_user: string;
  url_archivos: string = environment.URL_ARCHIVOS;
  is_auth: boolean = false;
  logo_mdc: string = `${environment.URL_SERVE}assets/img/Isotipo.jpg`;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.is_auth = true;
      this.auth_data = this.authService.getDataLogin();
      this.img_user = `${environment.URL_ARCHIVOS}${this.auth_data.foto_usuario}`;
    }
  }
  public cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(["inicio-sesion"]);
  }
}
