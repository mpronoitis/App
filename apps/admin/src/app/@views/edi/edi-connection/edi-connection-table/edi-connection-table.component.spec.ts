import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '@play.app/components';

import { EdiConnectionTableComponent } from './edi-connection-table.component';

describe('EdiConnectionTableComponent', () => {
  let component: EdiConnectionTableComponent;
  let fixture: ComponentFixture<EdiConnectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiConnectionTableComponent],
      imports: [
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        ComponentsModule,
        MatPaginatorModule,
        MatTableModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EdiConnectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
