import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTableComponent } from './events-table.component';
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
import { EventState } from '../../../@store/States/event.state';

describe('EventsTableComponent', () => {
  let component: EventsTableComponent;
  let fixture: ComponentFixture<EventsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsTableComponent],
      imports: [
        ComponentsModule,
        FontAwesomeTestingModule,
        NgxsModule.forRoot([EventState]),
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

    fixture = TestBed.createComponent(EventsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
