import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { config_version } from "@assets/config_version";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    public auth: AuthService,
    private httpClient: HttpClient
  ) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["inicio-sesion"]);
      return false;
    }
    return true;
  }
}
