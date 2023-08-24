import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from '@play.app/components';
import { EdiProfilesTableComponent } from './edi-profiles-table.component';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../../environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { EdiState } from '../../../../@store/States/edi.state';

describe('EdiProfilesTableComponent', () => {
  let component: EdiProfilesTableComponent;
  let fixture: ComponentFixture<EdiProfilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiProfilesTableComponent],
      imports: [
        NgxsModule.forRoot([EdiState]),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        getTranslocoModule(),
        MatFormFieldModule,
        RouterTestingModule,
        FontAwesomeModule,
        MatPaginatorModule,
        MatTableModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        ComponentsModule,
        MatInputModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [
        JwtHelperService,
        {
          provide: APP_ENV,
          useValue: environment,
        },
        ToastrService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiProfilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render play-components-simple-spinner if loading', () => {
    component.loading = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('play-components-simple-spinner')
    ).toBeTruthy();
  });

  it('should render a table with 2 columns', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('th').length).toEqual(2);
  });

  it('should have a mat-paginator', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-paginator')).toBeTruthy();
  });

  it('should dispatch GetEdiProfiles action on init', () => {
    const spy = jest.spyOn(component.store, 'dispatch');
    component.getProfiles(1, 10);
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch GetEdiProfiles action when button with id refresh is clicked', () => {
    const spy = jest.spyOn(component.store, 'dispatch');
    //get button with id refresh
    const button = fixture.nativeElement.querySelector('#refresh');
    //click on button
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});
