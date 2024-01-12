import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';
import swal from 'sweetalert2';
import { Functions } from '../utils/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardRoleService implements CanActivate {

  constructor(private router: Router, public auth: AuthService, private authGuard: AuthGuardService, private functions: Functions) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authGuard.canActivate();
    if(!this.auth.isGetAccess(route.data.c_opcion)){
      this.functions.messageAlert('error', 'Acceso no permitido', 'No puede acceder a esta opción. Por favor contáctese con el administrador para más información');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
