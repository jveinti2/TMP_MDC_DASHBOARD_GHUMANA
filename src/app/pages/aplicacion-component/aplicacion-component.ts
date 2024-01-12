import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { environment } from "src/environments/environment";
import { FormBuilder, Validators } from "@angular/forms";
import { Functions } from "src/app/utils/functions";
import { ActivatedRoute } from "@angular/router";
import { ListasService } from "src/app/services/listas.service";
import { AuthService } from "src/app/services/auth.service";
import { IUsuario } from "src/app/interfaces/i-usuario";

@Component({
  selector: "app-aplicacion-component",
  templateUrl: "./aplicacion-component.html",
  styleUrls: ["./aplicaciones.component.styl"],
})
export class AplicacionComponent implements OnInit, OnDestroy {
  data_usuario: IUsuario;
  lista_aplicaciones: any[] = [];
  protocol: string = location.protocol;
  token: any = null;
  constructor(
    private listasService: ListasService,
    private authService: AuthService,
    private functions: Functions
  ) {
    this.data_usuario = this.authService.getDataLogin();
  }
  ngOnInit() {
    this.functions.loadingAction("Cargando aplicaciones");
    this.listasService.getListaAplicaciones().subscribe((response) => {
      this.lista_aplicaciones = response.data;
      swal.close();
    });
  }
  ngOnDestroy() {}

  redireccionar(url_aplicacion, url_login_app) {
    this.functions.loadingAction("Redireccionando");
    let data_form = {
      username: this.data_usuario.email,
      password: "1",
      url_login_app: url_login_app,
      url_aplicacion: url_aplicacion,
    };

    this.listasService.inicioSesionApps(data_form).subscribe((response) => {
      if (response.error) {
        this.functions.messageAlert(
          "error",
          "Error en el ingreso",
          response.MSG
        );
        return false;
      }

      this.token = btoa(JSON.stringify(response.data));
      swal.close();
      window.open(
        `http://172.16.2.6/${url_aplicacion}?token=${this.token}`,
        "_blank"
      );
    });
  }
}
