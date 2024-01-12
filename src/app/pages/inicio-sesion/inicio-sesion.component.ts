import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { environment } from "src/environments/environment";
import { FormBuilder, Validators } from "@angular/forms";
import { Functions } from "src/app/utils/functions";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-inicio-sesion",
  templateUrl: "./inicio-sesion.component.html",
})
export class InicioSesionComponent implements OnInit, OnDestroy {
  loginForm;
  logo_mdc: string = `${environment.URL_SERVE}assets/img/logo-mdc.png`;
  _loading: string = `${environment.URL_SERVE}assets/img/loading.gif`;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private functions: Functions,
    private route: ActivatedRoute
  ) {
    this.loginForm = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }
  ngOnInit() {
    // document.body.className = "body-login";
    // let token = this.route.snapshot.queryParamMap.get("token");
    // if (token != null) {
    //   let data = JSON.parse(atob(token))[0];
    //   localStorage.setItem(environment.TOKEN_NAME, data);
    //   this.router.navigate(["/"]);
    // } else {
    //   document.location.href = `${location.protocol}//${location.hostname}/login/#/inicio-sesion?id_app=81&url_app=${location.protocol}//${location.hostname}`;
    // }
  }
  ngOnDestroy() {
    document.body.className = "";
  }
  public ingresoAplicacion(): void {
    if (this.loginForm.valid) {
      this.functions.loadingAction();
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((response) => {
          if (response.error) {
            this.functions.messageAlert(
              "error",
              "Error en el ingreso",
              response.MSG
            );
          } else {
            this.router.navigate(["/"]);
            swal.close();
            localStorage.setItem(environment.TOKEN_NAME, response.token);
          }
        });
    } else {
      this.functions.messageAlert(
        "error",
        "Error de formulario",
        "Hay campos erróneos en el formulario"
      );
    }
  }
}
