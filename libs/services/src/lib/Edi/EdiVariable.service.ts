import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';

@Injectable({
  providedIn: 'root',
})
export class EdiVariableService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @param id {number} - GetOnlyOneVariable
   * @param page {number} - Page number
   * @param pageSize {number} - Page size
   * @param EdiVariable {EdiVariable} - The variable object
   * @returns {Observable<Any>}
   * */

  getEdiVarialbleById(id: number): Observable<any> {
    //Get A Single Variable
    const req = this.http.get(this.environment.API_URL + 'edi/variables/' + id);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  getAllEdiVariables(page: number, pageSize: number): Observable<any> {
    //Get All Variables
    const req = this.http.get(
      this.environment.API_URL + 'edi/variables/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  deleteEdiVariableByID(id: number): Observable<any> {
    //Delete A Variable
    const req = this.http.delete(
      this.environment.API_URL + 'edi/variables/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  createEdiVariable(EdiVariable: EdiVariable): Observable<any> {
    //Create A Variable
    const req = this.http.post(
      this.environment.API_URL + 'edi/variables',
      EdiVariable
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  updateEdiVariable(EdiVariable: EdiVariable): Observable<any> {
    //Update A Variable
    const req = this.http.put(
      this.environment.API_URL + 'edi/variables',
      EdiVariable
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total count of variables
   */
  getEdiVariableCount(): Observable<any> {
    const req = this.http.get(this.environment.API_URL + 'edi/variables/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
