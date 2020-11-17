import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor() { }
}

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private toast: ToastrService,
    private authenticationService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: any = this.authenticationService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.roles.findIndex((x)=> x === parseInt(currentUser.role)) ===-1 ) {
        // role not authorised so redirect to home page
        this.toast.error('Unautherised Access', '', {
          timeOut: 3000
        })
        this.router.navigate(['/']);
        this.authenticationService.logout();
        return false;
      }
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['']);
    return false;
  }
}