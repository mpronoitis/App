import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule, SimpleChartComponent } from '@play.app/components';
import { APP_ENV } from '@play.app/app-env';
import { NavModule } from 'apps/customer/src/app/@nav/nav.module';
import { AuthState } from 'apps/customer/src/app/@store/States/auth.state';
import { tokenGetter } from 'apps/customer/src/app/app.module';
import { environment } from 'apps/customer/src/environments/environment';
import { EdiDocumentsTableComponent } from '../edi-documents-table/edi-documents-table.component';
import { EdiDashboardComponent } from './edi-dashboard.component';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { EdiConnectionsTableComponent } from '../edi-connections-table/edi-connections-table.component';
import { EdiProfilesTableComponent } from '../edi-profiles-table/edi-profiles-table.component';
import { ToastrModule } from 'ngx-toastr';

describe('EdiDashboardComponent', () => {
  let component: EdiDashboardComponent;
  let fixture: ComponentFixture<EdiDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EdiDashboardComponent,
        EdiDocumentsTableComponent,
        EdiConnectionsTableComponent,
        EdiProfilesTableComponent,
        SimpleChartComponent,
      ],
      imports: [
        NavModule,
        NgxsModule.forRoot([AuthState]),
        RouterTestingModule,
        FontAwesomeModule,
        HttpClientTestingModule,
        getTranslocoModule(),
        FontAwesomeModule,
        MatDialogModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        MatTableModule,
        ComponentsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: [],
            disallowedRoutes: [],
          },
        }),
        BrowserAnimationsModule,
      ],
      providers: [
        JwtHelperService,
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display play-components-simple-spinner if loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector(
      'play-components-simple-spinner'
    );
    expect(spinner).toBeTruthy();
  });

  it('should render play-components-simple-chart if not loading', () => {
    component.loading = false;
    fixture.detectChanges();
    const chart = fixture.nativeElement.querySelector(
      'play-components-simple-chart'
    );
    expect(chart).toBeTruthy();
  });

  it('should render play-app-edi-documents-table if activeTable is ediDocuments and not loading', () => {
    component.loading = false;
    component.activeTable = 'ediDocuments';
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector(
      'play-app-edi-documents-table'
    );
    expect(table).toBeTruthy();
  });

  it('should render play-app-edi-connections-table if activeTable is ediConnections and not loading', () => {
    component.loading = false;
    component.activeTable = 'ediConnections';
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector(
      'play-app-edi-connections-table'
    );
    expect(table).toBeTruthy();
  });

  it('should render play-app-edi-profiles-table if activeTable is ediProfiles and not loading', () => {
    component.loading = false;
    component.activeTable = 'ediProfiles';
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector(
      'play-app-edi-profiles-table'
    );
    expect(table).toBeTruthy();
  });

  it;
});
