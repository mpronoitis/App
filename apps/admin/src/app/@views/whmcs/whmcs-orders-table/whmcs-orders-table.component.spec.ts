import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhmcsOrdersTableComponent } from './whmcs-orders-table.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgxsTestModule } from '@ngxs/store/internals/testing/helpers/ngxs-test.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { WhmcsState } from '../../../@store/States/whmcs.state';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { ComponentsModule } from '@play.app/components';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

describe('WhmcsOrdersTableComponent', () => {
  let component: WhmcsOrdersTableComponent;
  let fixture: ComponentFixture<WhmcsOrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhmcsOrdersTableComponent],
      imports: [
        FontAwesomeTestingModule,
        ComponentsModule,
        NgxsModule.forRoot([WhmcsState]),
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

    fixture = TestBed.createComponent(WhmcsOrdersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
