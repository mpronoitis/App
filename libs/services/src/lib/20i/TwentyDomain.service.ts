import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwentyDomainService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Function to fetch all domains purchased/managed by 20i
   */
  getTwentyDomains(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + '20i/domains/all');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary search for a domain
   *
   * @param domain {string} - domain name with or w/o tld
   */
  searchTwentyDomains(domain: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + '20i/domains/search/' + domain
    );
    return req.pipe(timeout(15000)).pipe(shareReplay(1));
  }

  /**
   * @summary get domain periods
   */
  getDomainPeriods(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + '20i/domains/periods');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get count of domains purchased/managed by 20i
   */
  getTwentyDomainsCount(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + '20i/domains/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
