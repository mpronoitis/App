import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhmcsDashboardComponent } from './whmcs-dashboard.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WhmcsClientsTableComponent } from '../whmcs-clients-table/whmcs-clients-table.component';
import { WhmcsProductsTableComponent } from '../whmcs-products-table/whmcs-products-table.component';
import { WhmcsOrdersTableComponent } from '../whmcs-orders-table/whmcs-orders-table.component';
import { NgxsModule } from '@ngxs/store';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from '@play.app/components';

describe('WhmcsDashboardComponent', () => {
  let component: WhmcsDashboardComponent;
  let fixture: ComponentFixture<WhmcsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WhmcsDashboardComponent,
        WhmcsClientsTableComponent,
        WhmcsProductsTableComponent,
        WhmcsOrdersTableComponent,
      ],
      imports: [
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        MatDialogModule,
        ComponentsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhmcsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
