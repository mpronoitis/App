import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '@play.app/components';

import { EdiOrganizationTableComponent } from './edi-organization-table.component';

describe('EdiOrganizationTableComponent', () => {
  let component: EdiOrganizationTableComponent;
  let fixture: ComponentFixture<EdiOrganizationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiOrganizationTableComponent],
      imports: [
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        ComponentsModule,
        MatPaginatorModule,
        MatTableModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiOrganizationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
