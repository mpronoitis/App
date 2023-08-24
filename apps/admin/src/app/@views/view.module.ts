import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '@play.app/components';
import { NavModule } from '../@nav/nav.module';
import { SharedModule } from '../@utils/shared.module';
import { AdminViewComponent } from './view.component';
import { routes } from './view.routing.module';

@NgModule({
  declarations: [AdminViewComponent],
  imports: [
    RouterModule.forChild(routes),
    NavModule,
    SharedModule,
    FontAwesomeModule,
    ComponentsModule,
  ],

  exports: [],
  providers: [],
})
export class ViewModule {}
