import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PylonItemService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get Pylon Items with paging
   * @param page
   * @param pageSize
   */
  getItems(page: number, pageSize: number): Observable<any> {
    //getItems
    const req = this.http.get(
      this.environment.API_URL + 'pylon/item/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get Items by Name
   * @param name
   */
  getItemsByName(name: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'pylon/item/name/' + name
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total count of Items
   * @returns
   */
  getTotalCount(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'pylon/item/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total count of items created in a given date range
   * @param startDate
   * @param endDate
   */
  getTotalCountByDateRange(
    startDate: string,
    endDate: string
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'pylon/item/count/' + startDate + '/' + endDate
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
