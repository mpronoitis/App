import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@play.app/components';
import { NavModule } from '../@nav/nav.module';
import { SharedModule } from '../@utils/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ContentComponent } from './content.component';
import { routes } from './content.routing.module';

@NgModule({
  declarations: [ContentComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatSelectModule,
    MatInputModule,
    NavModule,
    MatAutocompleteModule,
  ],
  exports: [],

  providers: [],
})
export class ContentModule {}
