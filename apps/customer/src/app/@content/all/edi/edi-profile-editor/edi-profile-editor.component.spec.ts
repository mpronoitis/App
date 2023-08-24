import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { NgxsModule } from '@ngxs/store';
import { APP_ENV } from '@play.app/app-env';
import { ComponentsModule } from '@play.app/components';
import { NavModule } from 'apps/customer/src/app/@nav/nav.module';
import { environment } from 'apps/customer/src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { EdiProfileEditorComponent } from './edi-profile-editor.component';

describe('EdiProfileEditorComponent', () => {
  let component: EdiProfileEditorComponent;
  let fixture: ComponentFixture<EdiProfileEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiProfileEditorComponent],
      imports: [
        DragDropModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AngularEditorModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
        }),
        TranslocoTestingModule.forRoot({}),
        MatToolbarModule,
        MatDialogModule,
        NgxsModule.forRoot([]),
        BrowserAnimationsModule,
        ComponentsModule,
        NavModule,
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

    fixture = TestBed.createComponent(EdiProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
