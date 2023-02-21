import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenService : TokenService,
              private router : Router,
              private authService : AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

/*       const token = this.tokenService.getToken();

      if(!token){
        console.log("🚀 ~ file: auth.guard.ts ~ line 21 ~ AuthGuard ~ token", token)
        this.router.navigateByUrl('/home');
        return false;
      }

    return true; */

   return this.authService.User$
    .pipe(
      map(user => {
        if(!user){
          this.router.navigateByUrl('/home');
        return false;
        }
        return true;
      })
    )
  }
  
}
