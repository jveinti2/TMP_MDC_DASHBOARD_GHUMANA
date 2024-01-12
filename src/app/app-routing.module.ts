import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { InicioSesionComponent } from "./pages/inicio-sesion/inicio-sesion.component";
import { AplicacionComponent } from "./pages/aplicacion-component/aplicacion-component";
import { AuthGuardLoginService } from "./services/auth-guard-login.service";
import { CacheService } from "./services/cache.service";
const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardService],
    component: InicioComponent,
  },
  {
    path: "inicio-sesion",
    canActivate: [AuthGuardLoginService],
    component: InicioSesionComponent,
  },
  {
    path: "aplicacion",
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: AplicacionComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
