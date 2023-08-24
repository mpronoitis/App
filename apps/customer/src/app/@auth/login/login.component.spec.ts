import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { NgxsModule } from '@ngxs/store';
import { APP_ENV } from '@play.app/app-env';
import { ComponentsModule } from '@play.app/components';
import { environment } from 'apps/customer/src/environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthState } from '../../@store/States/auth.state';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([AuthState]),
        ToastrModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        TranslocoTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input for email', () => {
    const emailInput = fixture.nativeElement.querySelector('#email');
    expect(emailInput).toBeTruthy();
  });

  it('should have an input for password', () => {
    const passwordInput = fixture.nativeElement.querySelector('#password');
    expect(passwordInput).toBeTruthy();
  });

  it('should have a label for email', () => {
    const emailLabel = fixture.nativeElement.querySelector('#email-label');
    expect(emailLabel).toBeTruthy();
  });

  it('should have a label for password', () => {
    const passwordLabel =
      fixture.nativeElement.querySelector('#password-label');
    expect(passwordLabel).toBeTruthy();
  });

  it('should have a submit button', () => {
    const submitButton = fixture.nativeElement.querySelector('#submit');
    expect(submitButton).toBeTruthy();
  });

  it('should have play-components-simple-alert if capsOn is true', () => {
    component.capsOn = true;
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector(
      'play-components-simple-alert'
    );
    expect(alert).toBeTruthy();
  });

  it('should have a link with id forgot-password', () => {
    const link = fixture.nativeElement.querySelector('#forgot-password');
    expect(link).toBeTruthy();
  });

  it('should have a link with id trial-button', () => {
    const link = fixture.nativeElement.querySelector('#trial-button');
    expect(link).toBeTruthy();
  });

  it('should have a valid .webp image in login-image', () => {
    const image = fixture.nativeElement.querySelector('#login-image');
    expect(image).toBeTruthy();
    expect(image.src).toContain('.webp');
  });

  it('should display play-components-simple-alert with id caps-alert if capsOn is true', () => {
    component.capsOn = true;
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector(
      'play-components-simple-alert'
    );
    expect(alert).toBeTruthy();
    expect(alert.id).toEqual('caps-alert');
  });

  it('should dispatch Login action on submit', () => {
    component.form.controls.email.setValue('foobar@example.com');
    component.form.controls.password.setValue('foobar');
    const spy = jest.spyOn(component.store, 'dispatch');
    component.login();
    expect(spy).toHaveBeenCalled();
  });

  it('should display toastr error if email is invalid', () => {
    component.form.controls.email.setValue('foobar');
    component.form.controls.password.setValue('foobar');
    const spy = jest.spyOn(component.toastr, 'error');
    component.login();
    expect(spy).toHaveBeenCalled();
  });

  it('should return a valid webp image when calling chooseLoginImage', () => {
    const image = component.chooseLoginImage();
    expect(image).toContain('.webp');
  });
});
