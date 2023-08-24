import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';

@Injectable({
  providedIn: 'root',
})
export class EdiReportService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   *
   * @param startDate Start date of the report
   * @param endDate  End date of the report
   * @param customerId  Customer Id
   * @param period  Period of the report (daily, weekly, monthly)
   * @returns {Observable<any>}
   */
  getDocumentCount(
    startDate: string,
    endDate: string,
    customerId: string,
    period: string
  ) {
    const req = this.http.get(
      this.environment.API_URL +
        'edi/reports/count/' +
        startDate +
        '/' +
        endDate +
        '/' +
        customerId +
        '/' +
        period
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getDocumentCountTotal(startDate: string, endDate: string, period: string) {
    const req = this.http.get(
      this.environment.API_URL +
        'edi/reports/total-count/' +
        startDate +
        '/' +
        endDate +
        '/' +
        period
    );

    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
