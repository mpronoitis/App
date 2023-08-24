import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';
import { APP_ENV } from '@play.app/app-env';
import { PylonState } from 'apps/customer/src/app/@store/States/pylon.state';
import { environment } from 'apps/customer/src/environments/environment';
import { InvoiceComponent } from './invoice.component';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceComponent],
      imports: [
        FontAwesomeModule,
        NgxsModule.forRoot([PylonState]),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
