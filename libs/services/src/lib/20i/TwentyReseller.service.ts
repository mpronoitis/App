import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwentyResellerService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary get reseller package types
   */
  getResellerPackageTypes(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + '20i/reseller/get-package-types'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary renew domain for a given period
   * @param domain {string} - domain name
   * @param period {number} - period in years
   */
  renewDomain(domain: string, period: number): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        '20i/reseller/renew-domain/' +
        domain +
        '/' +
        period
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary get stack users
   */
  getStackUsers(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + '20i/reseller/get-stackusers'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
