import { NgModule } from '@angular/core';
import { EdiConnectionsTableComponent } from './edi-connections-table/edi-connections-table.component';
import { EdiDashboardComponent } from './edi-dashboard/edi-dashboard.component';
import { EdiProfileEditorComponent } from './edi-profile-editor/edi-profile-editor.component';
import { EdiDocumentsTableComponent } from './edi-documents-table/edi-documents-table.component';
import { EdiProfilesTableComponent } from './edi-profiles-table/edi-profiles-table.component';
import { SharedModule } from '../../../@utils/shared.module';
import { RouterModule } from '@angular/router';
import { EDI_ROUTES } from './edi.routing.module';

@NgModule({
  declarations: [
    EdiConnectionsTableComponent,
    EdiDashboardComponent,
    EdiProfileEditorComponent,
    EdiDocumentsTableComponent,
    EdiProfilesTableComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(EDI_ROUTES)],
  exports: [],
  providers: [],
})
export class EdiModule {}
