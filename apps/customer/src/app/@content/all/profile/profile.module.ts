import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../../../@utils/shared.module';
import { PROFILE_ROUTES } from './profile.routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent, ProfileComponent, SettingsComponent],
  imports: [SharedModule, RouterModule.forChild(PROFILE_ROUTES)],
})
export class ProfileModule {}
