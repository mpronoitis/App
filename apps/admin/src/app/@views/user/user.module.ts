import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavModule } from '../../@nav/nav.module';
import { SharedModule } from '../../@utils/shared.module';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { USER_ROUTES } from './user.routing.module';
import { InformationUserDialogComponent } from '../../@dialogs/User/information-user-dialog/information-user-dialog.component';
import { AddUserDialogComponent } from '../../@dialogs/User/add-user-dialog/add-user-dialog.component';

@NgModule({
  declarations: [
    UserTableComponent,
    UserDashboardComponent,
    UserAddComponent,
    UserUpdateComponent,
    UserDeleteComponent,
    InformationUserDialogComponent,
    AddUserDialogComponent,
  ],
  imports: [
    SharedModule,
    NavModule,
    FontAwesomeModule,
    RouterModule.forChild(USER_ROUTES),
  ],
  exports: [],
})
export class UserModule {}
