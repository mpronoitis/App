import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KumaNotificationService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get kuma notifications
   * @param page
   * @param pageSize
   */
  getKumaNotifications(page: number, pageSize: number): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'kuma/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   *  @summary Get latest entry for a given url , order by receivedAt desc
   * @param url The url to search for
   */
  getLatestEntryForUrl(url: string): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'kuma/latest/' + url);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Return incidents for a given url and a given time range , order by receivedAt desc
   * @param url
   * @param from
   * @param to
   */
  getIncidentsForUrlAndTimeRange(
    url: string,
    from: string,
    to: string
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'kuma/incidents/' + url + '/' + from + '/' + to
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
