import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxsModule } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { NavModule } from 'apps/customer/src/app/@nav/nav.module';
import { AuthState } from 'apps/customer/src/app/@store/States/auth.state';
import { APP_ENV } from '@play.app/app-env';
import { environment } from 'apps/customer/src/environments/environment';
import { getTranslocoModule } from '../../../../transloco-testing.module';
import { ComponentsModule } from '@play.app/components';
import { ToastrModule } from 'ngx-toastr';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        NgxsModule.forRoot([AuthState]),
        HttpClientTestingModule,
        RouterTestingModule,
        NavModule,
        MatDialogModule,
        FontAwesomeModule,
        ComponentsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        getTranslocoModule(),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return '';
            },
          },
        }),
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display play-components-simple-spinner when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector(
      'play-components-simple-spinner'
    );
    expect(spinner).toBeTruthy();
  });

  // it('should show play-components-toast-message when show_toast_message is true and loading is false', () => {
  //   component.show_toast_message = true;
  //   component.loading = false;
  //   fixture.detectChanges();
  //   const toastMessage = fixture.nativeElement.querySelector(
  //     'play-components-toast-message'
  //   );
  //   expect(toastMessage).toBeTruthy();
  // });

  it('should have a h1 with text Welcome if not loading', () => {
    component.loading = false;
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual(' Welcome ');
  });

  it('should have a p with id last-login that contains the text Last Login if not loading', () => {
    component.loading = false;
    fixture.detectChanges();
    const p = fixture.nativeElement.querySelector('#last-login');
    expect(p.textContent).toContain('Last Login');
  });

  it('should have 4 <fa-icon> elements if not loading', () => {
    component.loading = false;
    fixture.detectChanges();
    const icons = fixture.nativeElement.querySelectorAll('fa-icon');
    expect(icons.length).toEqual(4);
  });
});
