import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KumaNotificationComponent } from './kuma-notification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@play.app/app-env';
import { environment } from '../../../../environments/environment';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from '@play.app/components';

describe('KumaNotificationComponent', () => {
  let component: KumaNotificationComponent;
  let fixture: ComponentFixture<KumaNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KumaNotificationComponent],
      imports: [
        ComponentsModule,
        HttpClientTestingModule,
        FontAwesomeTestingModule,
        MatDialogModule,
      ],
      providers: [
        {
          provide: APP_ENV,
          useValue: environment,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(KumaNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
