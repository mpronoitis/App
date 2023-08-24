import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PylonSessionService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get Pylon Sessions
   * @endpoint GET /pylon/sessions/all
   */
  getSessions(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'pylon/sessions/all');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
