import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingTemplatesTableComponent } from './mailing-templates-table.component';
import { ComponentsModule } from '@play.app/components';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgxsModule } from '@ngxs/store';
import { MbamState } from '../../../@store/States/mbam.state';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

describe('MailingTemplatesTableComponent', () => {
  let component: MailingTemplatesTableComponent;
  let fixture: ComponentFixture<MailingTemplatesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailingTemplatesTableComponent],
      imports: [
        ComponentsModule,
        FontAwesomeTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-left',
          tapToDismiss: true,
        }),
        MatDialogModule,
        HttpClientTestingModule,
      ],
      providers: [
        JwtHelperService,
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MailingTemplatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
