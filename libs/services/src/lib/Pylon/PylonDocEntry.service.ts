import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PylonDocEntryService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get count of doc entries for a given date range
   * @param startDate
   * @param endDate
   */
  getCountByDateRange(startDate: string, endDate: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'pylon/docentries/count/' +
        startDate +
        '/' +
        endDate
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
