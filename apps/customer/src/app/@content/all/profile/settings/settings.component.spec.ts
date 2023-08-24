import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from '@play.app/components';
import { SettingsComponent } from './settings.component';
import { APP_ENV } from '@play.app/app-env';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavModule } from 'apps/customer/src/app/@nav/nav.module';
import { UserState } from 'apps/customer/src/app/@store/States/user.state';
import { environment } from 'apps/customer/src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { getTranslocoModule } from '../../../../transloco-testing.module';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [
        NgxsModule.forRoot([UserState]),
        getTranslocoModule(),
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDialogModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        ComponentsModule,
        MatSelectModule,
        FontAwesomeModule,
        MatOptionModule,
        NavModule,
        FormsModule,
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button with id saveLanguage should be hidden', () => {
    const button = fixture.nativeElement.querySelector('#saveLanguage');
    expect(button).toBeFalsy();
  });

  it('button with id updatePassword should be hidden', () => {
    const button = fixture.nativeElement.querySelector('#updatePassword');
    expect(button).toBeFalsy();
  });

  it('should have an input with id simple-search', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('input#simple-search')
    ).toBeTruthy();
  });

  it('should have an input with id password', () => {
    component.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input#password')).toBeTruthy();
  });

  it('should have a play-components-simple-button with id #themeChanged', () => {
    component.loading = false;
    component.themeChanged = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(
        'play-components-simple-button#themeChanged'
      )
    ).toBeTruthy();
  });

  it('should have a play-components-simple-button with id #languageChanged', () => {
    component.loading = false;
    component.languageChanged = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(
        'play-components-simple-button#languageChanged'
      )
    ).toBeTruthy();
  });

  it('should have a play-components-simple-alert with id #showChangeThemeMessage', () => {
    component.loading = false;
    component.showChangeThemeMessage = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(
        'play-components-simple-alert#showChangeThemeMessage'
      )
    ).toBeTruthy();
  });

  it('should have a play-components-simple-alert with id #showChangeLanguageMessage', () => {
    component.loading = false;
    component.showChangeLanguageMessage = true;
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector(
        'play-components-simple-alert#showChangeLanguageMessage'
      )
    ).toBeTruthy();
  });
});
