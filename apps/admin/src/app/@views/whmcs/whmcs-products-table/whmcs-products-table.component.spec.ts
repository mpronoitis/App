import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhmcsProductsTableComponent } from './whmcs-products-table.component';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from '@play.app/components';

describe('WhmcsProductsTableComponent', () => {
  let component: WhmcsProductsTableComponent;
  let fixture: ComponentFixture<WhmcsProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhmcsProductsTableComponent],
      imports: [NgxsModule.forRoot([]), ComponentsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WhmcsProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
