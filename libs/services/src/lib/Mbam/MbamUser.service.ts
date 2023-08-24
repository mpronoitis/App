import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MbamUserService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get all malwarebytes oneview users
   */
  getAllUsers(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'malwarebytes/users');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total count of users
   */
  getUserCount(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'malwarebytes/users/count'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
