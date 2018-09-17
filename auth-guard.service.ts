import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      if (user) { // if the user exists
        return true; // return true
      } else { // or
        this.router.navigate(['/'], { queryParams: {returnUrl: state.url}});
        return false;
        // return false and navigate the homepage
      }
    });
  }
}
