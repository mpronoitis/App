import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KumaNotificationComponent } from './kuma-notification/kuma-notification.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '@play.app/components';
import { KumaDetailsDialogComponent } from '../../@dialogs/Kuma/kuma-details-dialog/kuma-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [KumaNotificationComponent, KumaDetailsDialogComponent],
  imports: [CommonModule, FontAwesomeModule, ComponentsModule, MatDialogModule],
  exports: [KumaNotificationComponent, KumaDetailsDialogComponent],
})
export class KumaModule {}
