import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MbamSiteService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get all malwarebytes oneview sites
   */
  getAllSites(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'malwarebytes/sites');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get endpoints for a given account id (found in the site object)
   * @param accountId
   */
  getEndpoints(accountId: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'malwarebytes/sites/' +
        accountId +
        '/endpoints'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary get total site count
   */
  getSiteCount(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'malwarebytes/sites/count'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary get total endpoint count for a given account id
   * @param accountId
   */
  getEndpointCount(accountId: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'malwarebytes/sites/' +
        accountId +
        '/endpoints/count'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
