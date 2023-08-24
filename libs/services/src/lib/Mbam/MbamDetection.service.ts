import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MbamDetectionService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get detections by account id (found in the site object)
   * @param accountId
   */
  getDetections(accountId: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'malwarebytes/detections/' + accountId
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get all detections
   */
  getAllDetections(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'malwarebytes/detections/all'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
