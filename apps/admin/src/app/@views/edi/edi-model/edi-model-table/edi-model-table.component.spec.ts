import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '@play.app/components';

import { EdiModelTableComponent } from './edi-model-table.component';

describe('EdiModelTableComponent', () => {
  let component: EdiModelTableComponent;
  let fixture: ComponentFixture<EdiModelTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiModelTableComponent],
      imports: [
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        ComponentsModule,
        MatPaginatorModule,
        MatTableModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiModelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
