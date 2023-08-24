import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiCreditDashboardComponent } from './edi-credit-dashboard.component';
import { NgxsModule } from '@ngxs/store';
import { EdiState } from '../../../../@store/States/edi.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { ComponentsModule } from '@play.app/components';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';

describe('EdiCreditDashboardComponent', () => {
  let component: EdiCreditDashboardComponent;
  let fixture: ComponentFixture<EdiCreditDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiCreditDashboardComponent],
      imports: [
        NgxsModule.forRoot([EdiState]),
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        FontAwesomeTestingModule,
        ComponentsModule,
        MatDialogModule,
      ],

      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiCreditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
