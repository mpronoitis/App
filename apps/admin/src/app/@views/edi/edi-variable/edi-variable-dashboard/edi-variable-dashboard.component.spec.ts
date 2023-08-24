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

import { EdiVariableDashboardComponent } from './edi-variable-dashboard.component';

describe('EdiVariableDashboardComponent', () => {
  let component: EdiVariableDashboardComponent;
  let fixture: ComponentFixture<EdiVariableDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiVariableDashboardComponent],
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
    fixture = TestBed.createComponent(EdiVariableDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
