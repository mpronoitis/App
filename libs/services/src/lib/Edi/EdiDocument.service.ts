import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, timeout } from 'rxjs';
import { APP_ENV } from '@play.app/app-env';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';

@Injectable({
  providedIn: 'root',
})
export class EdiDocumentService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @description - This method is used for fetching Edi Documents with paging
   * @param {string} customer_id - The customer id
   * @param {number} page - The page number
   * @param {number} pageSize - The page size
   * @param {number} id - GetOnlyOneDocument
   * @param {EdiDocument} EdiDocument - The document object
   * @returns {Observable<any>} - The observable that contains the response
   */
  getEdiDocuments(
    page: number,
    pageSize: number,
    customer_Id: string
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'edi/documents/all/customerid/' +
        customer_Id +
        '/' +
        page +
        '/' +
        pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - This method is used to get a single document by id
   * @param id - The document id
   */
  getEdiDocumentById(id: string): Observable<any> {
    //Get A Single Document
    const req = this.http.get(this.environment.API_URL + 'edi/documents/' + id);
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - Delete a document by id
   * @param id - The document id
   */
  deleteEdiDocumentById(id: number): Observable<any> {
    //Delete A Single Document Only For Admin
    const req = this.http.delete(
      this.environment.API_URL + 'edi/documents/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - Get All Documents By Customer Id with paging
   * @param page - The page number
   * @param pageSize - The page size
   */
  getAllDocuments(page: number, pageSize: number): Observable<any> {
    //Get All Documents For Admin
    const req = this.http.get(
      this.environment.API_URL + 'edi/documents/all/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - Get total number of documents for a customer
   * @param customer_Id - The customer id
   */
  getTotalDocumentsByCustomerId(customer_Id: string): Observable<any> {
    //Get Total Documents By Customer Id
    const req = this.http.get(
      this.environment.API_URL + 'edi/documents/count/customerid/' + customer_Id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - Create a new document
   * @param document - The document object
   */
  createDocument(document: EdiDocument): Observable<any> {
    //Create Document
    const req = this.http.post(
      this.environment.API_URL + 'edi/documents',
      document
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   *  @summary - Update a document
   * @param document - The document object
   */
  updateDocument(document: EdiDocument): Observable<any> {
    //Update Document
    const req = this.http.put(
      this.environment.API_URL + 'edi/documents',
      document
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - Get total number of documents for a customer by date range
   * @param customer_Id - The customer id
   * @param startDate - The start date
   * @param endDate - The end date
   */
  getTotalDocumentsByCustomerIdAndDateRange(
    customer_Id: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    //Get Total Documents By Customer Id and Date Range
    const req = this.http.get(
      this.environment.API_URL +
        'edi/documents/count/customerid/' +
        customer_Id +
        '/date/' +
        startDate +
        '/' +
        endDate
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get total count of documents
   */
  getTotalDocuments(): Observable<any> {
    //Get Total Documents
    const req = this.http.get(this.environment.API_URL + 'edi/documents/count');
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary - Get all documents of customer with no payload and pagination
   * @param customer_Id - The customer id
   * @param page - The page number
   * @param pageSize - The page size
   */

  getEdiDocumentsByCustomerIdNoPayload(
    customer_Id: string,
    page: number,
    pageSize: number
  ): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL +
        'edi/documents/all/customerid/' +
        customer_Id +
        '/' +
        page +
        '/' +
        pageSize +
        '/' +
        'nopayload'
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
