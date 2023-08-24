import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '@play.app/app-env';
import { Observable, shareReplay, timeout } from 'rxjs';
import { EmailTemplate } from '@play.app/types/Mailing/EmailTemplate';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplateService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENV) private environment: any
  ) {}

  /**
   * @summary Get all templates with pagination
   * @param page Page number
   * @param pageSize Page size
   */
  getTemplates(page: number, pageSize: number): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'emailTemplates/' + page + '/' + pageSize
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Add a new template
   * @param template Template to add
   */
  addTemplate(template: EmailTemplate): Observable<any> {
    const req = this.http.post(
      this.environment.API_URL + 'emailTemplates',
      template
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Update a template
   * @param template Template to update
   */
  updateTemplate(template: EmailTemplate): Observable<any> {
    const req = this.http.put(
      this.environment.API_URL + 'emailTemplates',
      template
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   *  @summary Delete a template
   *  @param id Template id
   */
  deleteTemplate(id: string): Observable<any> {
    const req = this.http.delete(
      this.environment.API_URL + 'emailTemplates/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }

  /**
   * @summary Get a template by id
   * @param id Template id
   */
  getTemplateById(id: string): Observable<any> {
    const req = this.http.get(
      this.environment.API_URL + 'emailTemplates/' + id
    );
    return req.pipe(timeout(this.environment.API_TIMEOUT)).pipe(shareReplay(1));
  }
}
