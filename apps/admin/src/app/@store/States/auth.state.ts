import { AuthStateModel } from '../Models/AuthStateModel';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  ForgotPassword,
  Login,
  Logout,
  Register,
  UpdatePassword,
  UpdateToken,
  ValidateToken,
} from '../Actions/auth.actions';
import { AuthService } from '@play.app/services/Auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    id: null,
    token: null,
    email: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static token() {
    return this.token;
  }

  @Selector()
  static isAuthenticated() {
    return !!localStorage.getItem('auth.token');
  }

  @Selector()
  static Id() {
    return this.Id;
  }

  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.loginUser(action.payload).pipe(
      tap({
        next: (result: { token: string }) => {
          const role = this.jwtHelper.decodeToken(result.token).role;
          if (role !== 'PlayAdmin') {
            //only PlayAdmin role can enroll
            localStorage.clear();
            this.router.navigate(['auth/login']).then((r) => r);
            return;
          }
          ctx.patchState({
            token: result.token,
            email: action.payload.email,
          });
        },
        error: (error) => {
          console.log(error);
        },
      })
    );
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.registerUser(action.payload).pipe(
      tap((result: { token: string }) => {
        //get sub from token
        const sub = this.jwtHelper.decodeToken(result.token).sub;
        ctx.patchState({
          id: sub,
          token: result.token,
          email: action.payload.email,
        });
      })
    );
  }

  /**
   *
   * @summary Logout action will clear the state and route to login page
   * @returns
   */
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      id: null,
      token: null,
      email: null,
    });
    //remove everything from local storage
    this.router.navigate(['/auth/login']).then((r) => localStorage.clear());
  }

  @Action(ValidateToken)
  validateToken(ctx: StateContext<AuthStateModel>) {
    return this.authService.validateToken().pipe(
      tap((result: { valid: boolean }) => {
        //if token is not valid, we logout the user
        if (!result.valid) {
          ctx.dispatch(new Logout());
        }
      })
    );
  }

  /**
   * @summary This action is used to update a users password
   * @param ctx
   * @param action
   */

  @Action(UpdatePassword)
  updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {
    return this.authService
      .updatePassword(
        action.payload.customer_id,
        action.payload.email,
        action.payload.old_password,
        action.payload.password
      )
      .pipe(
        tap((result: { token: string }) => {
          //update the token
          ctx.patchState({
            token: result.token,
          });
        })
      );
  }

  @Action(ForgotPassword)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassword) {
    return this.authService.forgotPassword(action.payload.email).pipe(
      tap((result: any) => {
        console.log(result);
      })
    );
  }

  @Action(UpdateToken)
  updateToken(ctx: StateContext<AuthStateModel>) {
    return this.authService.renewToken().pipe(
      tap((result: { token: string }) => {
        ctx.patchState({
          token: result.token,
        });
      })
    );
  }
}
