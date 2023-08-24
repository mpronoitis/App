import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingTemplateEditorComponent } from './mailing-template-editor.component';
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
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FormsModule} from "@angular/forms";

describe('MailingTemplateEditorComponent', () => {
  let component: MailingTemplateEditorComponent;
  let fixture: ComponentFixture<MailingTemplateEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MailingTemplateEditorComponent],
      imports: [
        RouterTestingModule,
        ComponentsModule,
        FontAwesomeTestingModule,
        AngularEditorModule,
        FormsModule,
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

    fixture = TestBed.createComponent(MailingTemplateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
