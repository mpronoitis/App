import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';

@Injectable({
  providedIn: 'root',
})
export class WhmcsSystemService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary - This method is used to get Whmcs system stats
   */
  getWhmcsSystemStats(): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'whmcs/system/getstats'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
