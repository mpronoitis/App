import { NgModule } from '@angular/core';
import { ComponentsModule } from '@play.app/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../@nav/nav.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { JoinPipe } from './join.pipe';
import { GravatarModule } from 'ngx-gravatar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { KumaModule } from '../@views/Kuma/kuma.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HtmlFormatterPipe } from './html-formatter.pipe';

@NgModule({
  declarations: [JoinPipe, HtmlFormatterPipe],
  imports: [],
  exports: [
    CommonModule,
    ComponentsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NavModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatDialogModule,
    MatExpansionModule,
    MatSortModule,
    JoinPipe,
    GravatarModule,
    MatToolbarModule,
    KumaModule,
    MatStepperModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    AngularEditorModule,
    HtmlFormatterPipe,
  ],
  providers: [],
})
export class SharedModule {}
