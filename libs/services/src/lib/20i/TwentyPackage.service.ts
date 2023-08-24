import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwentyPackageService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get all packages
   */
  getTwentyPackages(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + '20i/packages/all');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get package by id
   * @param id {string} - package id
   */
  getTwentyPackage(id: string): Observable<any> {
    const req = this.http.get(this.environment.API_URL + '20i/packages/' + id);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get package limits by id
   * @param id {string} - package id
   */
  getTwentyPackageLimits(id: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + '20i/packages/limits/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary start malware scan
   * @param id {string} - package id
   */

  getStartMalwareScan(id: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + '20i/packages/start-scan/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get package web logs
   * @param id {string} - package id
   */
  getTwentyPackageWebLogs(id: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + '20i/packages/web-logs/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary check malware scan
   */
  getCheckMalwareScan(id: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + '20i/packages/check-scan/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getStartMassScan(packageIds: string[]) {
    const req = this.http.post(
      this.environment.API_URL + '20i/packages/mass-scan',
      packageIds
    );
    return req.pipe(timeout(30000)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total count of packages
   */
  getTwentyPackagesCount(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + '20i/packages/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
