import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngxs/store';
import { AuthState } from '../@store/States/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private jwt: JwtHelperService
  ) {}

  canActivate() {
    //get token from local storage and remove '
    const token = localStorage.getItem('auth.token')?.replace(/['"]+/g, '');
    //if token is null
    if (!token) {
      this.router.navigate(['/auth/login']).then(() => {
        return false;
      });
    }
    //if token is expired
    if (this.jwt.isTokenExpired(token)) {
      this.router.navigate(['/auth/login']).then(() => {
        return false;
      });
    }

    const isAuthenticated = this.store.selectSnapshot(
      AuthState.isAuthenticated
    );
    //don't call validate token action since token is validated on every request from the api
    //this.store.dispatch(new ValidateToken());
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']).then(() => {
        return false;
      });
    }
    return isAuthenticated;
  }
}
