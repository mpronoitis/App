import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { GravatarModule } from 'ngx-gravatar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { ComponentsModule } from '@play.app/components';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    GravatarModule,
    FontAwesomeModule,
    MatTooltipModule,
    TranslocoModule,
    ComponentsModule,
  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [],
})
export class NavModule {}
