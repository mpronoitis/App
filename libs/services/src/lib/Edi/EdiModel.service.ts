import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_ENV } from '@play.app/app-env';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { Observable, shareReplay, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EdiModelService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @param id {number} - GetOnlyOneConnection
   * @param page {number} - Page number
   * @param pageSize {number} - Page size
   * @param EdiModel {EdiConnection} - The connection object
   * @returns {Observable<Any>}
   */

  getEdiModelById(id: number): Observable<any> {
    //Get A Single Model
    const req = this.http.get(this.environment.API_URL + 'edi/models/' + id);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getAllEdiModels(page: number, pageSize: number): Observable<any> {
    //Get All Models
    const req = this.http.get(
      this.environment.API_URL + 'edi/models/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  createEdiModel(EdiModel: EdiModel): Observable<any> {
    //Create A EdiModel
    const req = this.http.post(
      this.environment.API_URL + 'edi/models',
      EdiModel
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  updateEdiModel(EdiModel: EdiModel): Observable<any> {
    //Update A Model
    const req = this.http.put(
      this.environment.API_URL + 'edi/models',
      EdiModel
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  deleteEdiModel(id: number): Observable<any> {
    //Delete A Model
    const req = this.http.delete(this.environment.API_URL + 'edi/models/' + id);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - Get total count of models
   */
  getEdiModelCount(): Observable<any> {
    //Get Count Of Models
    const req = this.http.get(this.environment.API_URL + 'edi/models/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
