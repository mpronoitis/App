import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxsModule } from '@ngxs/store';
import { NavModule } from '../@nav/nav.module';
import { ContentComponent } from './content.component';
import { getTranslocoModule } from '../transloco-testing.module';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentComponent],
      imports: [
        NgxsModule.forRoot([]),
        HttpClientTestingModule,
        RouterTestingModule,
        NavModule,
        FontAwesomeModule,
        MatDialogModule,
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
    }).compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
