import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PylonDashboardComponent } from './pylon-dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { ComponentsModule } from '@play.app/components';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgxsModule } from '@ngxs/store';

describe('PylonDashboardComponent', () => {
  let component: PylonDashboardComponent;
  let fixture: ComponentFixture<PylonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PylonDashboardComponent],
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
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PylonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
