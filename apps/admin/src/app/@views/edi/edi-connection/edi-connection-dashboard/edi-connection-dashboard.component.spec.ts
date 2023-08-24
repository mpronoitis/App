import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgxsModule } from '@ngxs/store';
import { APP_ENV } from '@play.app/app-env';
import { ComponentsModule } from '@play.app/components';
import { EdiState } from 'apps/admin/src/app/@store/States/edi.state';
import { environment } from 'apps/admin/src/environments/environment';
import { ToastrModule } from 'ngx-toastr';

import { EdiConnectionDashboardComponent } from '../edi-connection-dashboard/edi-connection-dashboard.component';

describe('EdiModelDashboardComponent', () => {
  let component: EdiConnectionDashboardComponent;
  let fixture: ComponentFixture<EdiConnectionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiConnectionDashboardComponent],
      imports: [
        NgxsModule.forRoot([EdiState]),
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        FontAwesomeTestingModule,
        ComponentsModule,
      ],

      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdiConnectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
