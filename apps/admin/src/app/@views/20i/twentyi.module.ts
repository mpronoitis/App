import { NgModule } from '@angular/core';
import { TwentyiDashoardComponent } from './twentyi-dashoard/twentyi-dashoard.component';
import { SharedModule } from '../../@utils/shared.module';
import { TWENTYI_ROUTES } from './twentyi.routing.module';
import { RouterModule } from '@angular/router';
import { TwentyiDomainsTableComponent } from './twentyi-domains-table/twentyi-domains-table.component';
import { TwentyiPackagesTableComponent } from './twentyi-packages-table/twentyi-packages-table.component';
import { MatIconModule } from '@angular/material/icon';
import { TwentyPackageDetailsDialogComponent } from '../../@dialogs/20i/twenty-package-details-dialog/twenty-package-details-dialog.component';
import { TwentyDomainSearchDialogComponent } from '../../@dialogs/20i/twenty-domain-search-dialog/twenty-domain-search-dialog.component';
import { TwentyiPackageTypesTableComponent } from './twentyi-package-types-table/twentyi-package-types-table.component';
import { TwentyiUsersTableComponent } from './twentyi-users-table/twentyi-users-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(TWENTYI_ROUTES),
    MatIconModule,
    MatCheckboxModule,
  ],
  declarations: [
    TwentyiDashoardComponent,
    TwentyiDomainsTableComponent,
    TwentyiPackagesTableComponent,
    TwentyPackageDetailsDialogComponent,
    TwentyDomainSearchDialogComponent,
    TwentyiPackageTypesTableComponent,
    TwentyiUsersTableComponent,
  ],
  exports: [],
  providers: [],
})
export class TwentyiModule {}
