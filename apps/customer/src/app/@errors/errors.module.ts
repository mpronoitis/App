import { NgModule } from '@angular/core';
import { ComponentsModule } from '@play.app/components';
import { NavModule } from '../@nav/nav.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [ComponentsModule, NavModule],
  exports: [NotFoundComponent, ComponentsModule],
  providers: [],
})
export class ErrorsModule {}
