import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PylonSysService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get Pylon Sys entry by sys key
   * @param sysKey {string} Pylon Sys Key
   * @endpoint GET /pylon/sys/{sysKey}
   */
  getSysByKey(sysKey: string): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'pylon/sys/' + sysKey);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
