import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractingDashboardComponent } from './contracting-dashboard.component';
import { ComponentsModule } from '@play.app/components';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgxsModule } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';

describe('ContractingDashboardComponent', () => {
  let component: ContractingDashboardComponent;
  let fixture: ComponentFixture<ContractingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractingDashboardComponent],
      imports: [
        ComponentsModule,
        FontAwesomeTestingModule,
        NgxsModule.forRoot([]),
        HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-left',
          tapToDismiss: true,
          timeOut: 3000,
        }),
        MatDialogModule,
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
