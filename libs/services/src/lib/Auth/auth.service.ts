import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, timeout } from 'rxjs/operators';
import { loginUser } from '@play.app/types/Auth/loginUser';
import { RegisterUser } from '@play.app/types/Auth/RegisterUser';
import { APP_ENV } from '@play.app/app-env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @description - This method is used to login the user
   * @param {loginUser} loginUser - The login user object
   * @returns {Observable<any>} - The observable that contains the response
   */
  loginUser(loginUser: loginUser): Observable<any> {
    const req = this.http.post(
      'https://api.playsystems.io/' + 'auth/user/login',
      loginUser
    );
    //we pipe with shareReplay(1) to share the same observable across the app (we dont want it to be called multiple times silmultaneously)
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @description - This method is used to register the user
   * @param {RegisterUser} registerUser - The register user object
   * @returns {Observable<any>} - The observable that contains the response
   */
  registerUser(registerUser: RegisterUser): Observable<any> {
    const req = this.http.post(
      this.environment.API_URL + 'auth/user/register',
      registerUser
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @description - This method is used to validate the token
   * @returns {Observable<any>} - The observable that contains the response
   * @memberof AuthService
   */
  validateToken(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'auth/user/validate-token'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @description - This method is used to renew the token
   * @returns {Observable<any>} - The observable that contains the response
   * @memberof AuthService
   */
  renewToken(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'auth/user/refresh-token'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @description - This method is used to update the user's password
   * @param {string} customerId - The customer id
   * @param {string} email - The customer email
   * @param {string} oldPassword - The customer old password
   * @param {string} password - The new password
   *
   * @returns {Observable<any>} - The observable that contains the response
   */
  updatePassword(
    customerId: string,
    email: string,
    oldPassword: string,
    password: string
  ): Observable<any> {
    //create the request body
    const body = {
      Id: customerId,
      Email: email,
      Old_Password: oldPassword,
      Password: password,
    };
    const req = this.http.put(
      this.environment.API_URL + 'auth/user/update-password',
      body
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  forgotPassword(email: string): Observable<any> {
    const req = this.http.post(
      this.environment.API_URL + 'auth/user/forgot-password',
      { email: email }
    );

    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
