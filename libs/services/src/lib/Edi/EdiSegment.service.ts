import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';

@Injectable({
  providedIn: 'root',
})
export class EdiSegmentService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @param id {number} - GetOnlyOneSegment
   * @param page {number} - Page number
   * @param pageSize {number} - Page size
   * @param EdiSegment {EdiSegment} - The segment object
   * @returns {Observable<Any>}
   * */

  getEdiSegmentById(id: number): Observable<any> {
    //Get A Single Segment
    const req = this.http.get(this.environment.API_URL + 'edi/segments/' + id);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  deleteEdiSegmentById(id: number): Observable<any> {
    //Delete A Single Segment
    const req = this.http.delete(
      this.environment.API_URL + 'edi/segments/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getAllEdiSegments(page: number, pageSize: number): Observable<any> {
    //Get All Segments
    const req = this.http.get(
      this.environment.API_URL + 'edi/segments/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  createEdiSegment(EdiSegment: EdiSegment): Observable<any> {
    //Create A EdiSegment Only Admin
    const req = this.http.post(
      this.environment.API_URL + 'edi/segments',
      EdiSegment
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  updateEdiSegment(EdiSegment: EdiSegment): Observable<any> {
    //Update A Segment Only Admin
    const req = this.http.put(
      this.environment.API_URL + 'edi/segments',
      EdiSegment
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total count of segments
   */
  getEdiSegmentCount(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'edi/segments/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
