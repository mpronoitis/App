import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { APP_ENV } from '@play.app/app-env';
import { ComponentsModule } from '@play.app/components';
import { PylonState } from 'apps/customer/src/app/@store/States/pylon.state';
import { environment } from 'apps/customer/src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InvoicingDashboardComponent } from './invoicing-dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { getTranslocoModule } from 'apps/customer/src/app/transloco-testing.module';

describe('InvoicingDashboardComponent', () => {
  let component: InvoicingDashboardComponent;
  let fixture: ComponentFixture<InvoicingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoicingDashboardComponent],
      imports: [
        NgxsModule.forRoot([PylonState]),
        HttpClientTestingModule,
        RouterTestingModule,
        ComponentsModule,
        getTranslocoModule(),
        MatTableModule,
        MatFormFieldModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-left',
          tapToDismiss: true,
        }),
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be in loading state after init', () => {
    expect(component.loading).toBeTruthy();
  });

  it('should turn loading to true after getPylonInvoices is called', () => {
    component.getPylonInvoices();
    expect(component.loading).toBeTruthy();
  });

  it('should render play-components-simple-spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('play-components-simple-spinner')
    ).toBeTruthy();
  });
});
