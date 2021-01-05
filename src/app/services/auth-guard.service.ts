import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //TODO: use actual authentication
    if(JSON.parse(sessionStorage.getItem("isLoggedIn"))){
      return true;
    }

    this.router.navigate(['login'])
  }
}
