import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyiDashoardComponent } from './twentyi-dashoard.component';
import { NgxsModule } from '@ngxs/store';
import { TwentyState } from '../../../@store/States/twenty.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../../customer/src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '@play.app/components';

describe('TwentyiDashoardComponent', () => {
  let component: TwentyiDashoardComponent;
  let fixture: ComponentFixture<TwentyiDashoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentyiDashoardComponent],
      imports: [
        MatExpansionModule,
        NoopAnimationsModule,
        FontAwesomeTestingModule,
        NgxsModule.forRoot([TwentyState]),
        HttpClientTestingModule,
        ComponentsModule,
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

    fixture = TestBed.createComponent(TwentyiDashoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
