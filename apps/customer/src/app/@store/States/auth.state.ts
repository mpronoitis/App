import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthService } from '@play.app/services/Auth/auth.service';
import {
  ForgotPassword,
  Login,
  Logout,
  Register,
  UpdatePassword,
  UpdateToken,
  ValidateToken,
} from '../Actions/auth.actions';
import { AuthStateModel } from '../Models/AuthStateModel';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    id: null,
    token: null,
    email: null,
    lastLogin: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static token() {
    //if its null return undefined
    return this.token;
  }

  @Selector()
  static email() {
    return this.email;
  }

  @Selector()
  static lastLogin() {
    return this.lastLogin;
  }

  @Selector()
  static isAuthenticated() {
    return localStorage.getItem('auth.token') !== null;
  }

  @Selector()
  static Id() {
    return this.Id;
  }

  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private store: Store
  ) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.loginUser(action.payload).pipe(
      tap((result: { token: string; lastLogin: string }) => {
        //get sub from token

        const sub = this.jwtHelper.decodeToken(result.token).sub;
        ctx.patchState({
          id: sub,
          token: result.token,
          email: action.payload.email,
          lastLogin: result.lastLogin,
        });
        //route to home
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
    localStorage.clear();
    this.router.navigate(['/auth/login']);
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
