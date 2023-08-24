import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { EdiOrganization } from '@play.app/types/Edi/EdiOrganization';
import { EdiStateModel } from '../Models/EdiStateModel';
import { EdiModelService } from '@play.app/services/Edi/EdiModel.service';
import { EdiOrganizationService } from '@play.app/services/Edi/EdiOrganization.service';
import {
  AddEdiConnection,
  AddEdiModel,
  AddEdiOrganization,
  AddEdiSegment,
  AddEdiVariable,
  BuildAllUnBuiltDocuments,
  DeleteEdiConnection,
  DeleteEdiModel,
  DeleteEdiOrganization,
  DeleteEdiSegment,
  DeleteEdiVariable,
  GetEdiConnectionCount,
  GetEdiConnections,
  GetEdiDocumentCount,
  GetEdiDocumentCountByCustomerAndDateRange,
  GetEdiDocumentCountReport,
  GetEdiDocuments,
  GetEdiModel,
  GetEdiModelCount,
  GetEdiModels,
  GetEdiOrganizations,
  GetEdiProfileCount,
  GetEdiProfiles,
  GetEdiSegmentCount,
  GetEdiSegments,
  GetEdiVariableCount,
  GetEdiVariables,
  SendAllUnSentDocuments,
  UpdateEdiConnection,
  UpdateEdiModel,
  UpdateEdiOrganization,
  UpdateEdiSegment,
  UpdateEdiVariable,
  GetEdiCredits,
  GetEdiCredit,
  AddEdiCredit,
  UpdateEdiCredit,
  DeleteEdiCredit,
  GetEdiCreditByCustomerId,
} from '../Actions/edi.actions';
import { EdiSegmentService } from '@play.app/services/Edi/EdiSegment.service';
import { tap } from 'rxjs';
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { EdiConnectionService } from '@play.app/services/Edi/EdiConnection.service';
import { EdiProfile } from '@play.app/types/Edi/EdiProfile';
import { EdiProfileService } from '@play.app/services/Edi/EdiProfile.service';
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';
import { EdiVariableService } from '@play.app/services/Edi/EdiVariable.service';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';
import { EdiDocumentService } from '@play.app/services/Edi/EdiDocument.service';
import { EdiReportService } from '@play.app/services/Edi/EdiReport.service';
import { EdiActionService } from '@play.app/services/Edi/EdiAction.service';
import { ToastrService } from 'ngx-toastr';
import { EdiCreditService } from '@play.app/services/Edi/EdiCredit.service';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
@State<EdiStateModel>({
  name: 'edi',
  defaults: {
    ediModels: null,
    ediOrganizations: null,
    ediSegments: null,
    ediConnections: null,
    ediProfiles: null,
    ediVariables: null,
    ediDocuments: null,
    ediCredits: null,
    ediDocumentCountReport: null,
    ediDocumentCount: null,
    ediModelsCount: null,
    ediSegmentsCount: null,
    ediVariablesCount: null,
    ediProfilesCount: null,
    ediConnectionsCount: null,
  },
})
@Injectable()
export class EdiState {
  constructor(
    private EdiModelService: EdiModelService,
    private EdiOrganizationService: EdiOrganizationService,
    private EdiSegmentService: EdiSegmentService,
    private EdiConnectionService: EdiConnectionService,
    private EdiProfileService: EdiProfileService,
    private EdiVariableService: EdiVariableService,
    private EdiDocumentService: EdiDocumentService,
    private EdiReportService: EdiReportService,
    private EdiActionService: EdiActionService,
    private EdiCreditService: EdiCreditService,
    private store: Store,
    private toastr: ToastrService
  ) {}

  @Action(GetEdiModels)
  getEdiModels(
    { patchState }: StateContext<EdiStateModel>,
    action: GetEdiModels
  ) {
    return this.EdiModelService.getAllEdiModels(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap({
        next: (response) => {
          patchState({
            ediModels: response,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting edi models, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetEdiDocuments)
  getEdiDocuments(
    { patchState }: StateContext<EdiStateModel>,
    action: GetEdiDocuments
  ) {
    return this.EdiDocumentService.getAllDocuments(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap({
        next: (response) => {
          patchState({
            ediDocuments: response,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting edi documents, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetEdiOrganizations)
  getEdiOrganizations(
    { patchState }: StateContext<EdiStateModel>,
    action: GetEdiOrganizations
  ) {
    return this.EdiOrganizationService.getAllEdiOrganizations(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap({
        next: (response) => {
          patchState({
            ediOrganizations: response,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting edi organizations, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetEdiVariables)
  getEdiVariables(
    { patchState }: StateContext<EdiStateModel>,
    action: GetEdiVariables
  ) {
    return this.EdiVariableService.getAllEdiVariables(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap({
        next: (response) => {
          patchState({
            ediVariables: response,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting edi variables, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(AddEdiVariable)
  addEdiVariable(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { patchState }: StateContext<EdiStateModel>,
    action: AddEdiVariable
  ) {
    return this.EdiVariableService.createEdiVariable(
      action.payload.ediVariable
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiVariable) => {})
    );
  }

  @Action(UpdateEdiVariable)
  updateEdiVariable(
    { patchState }: StateContext<EdiStateModel>,
    action: UpdateEdiVariable
  ) {
    return this.EdiVariableService.updateEdiVariable(
      action.payload.ediVariable
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiVariable) => {})
    );
  }

  @Action(DeleteEdiVariable)
  deleteEdiVariable(
    { patchState }: StateContext<EdiStateModel>,
    action: DeleteEdiVariable
  ) {
    return this.EdiVariableService.deleteEdiVariableByID(
      action.payload.id
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiVariable) => {})
    );
  }

  @Action(GetEdiSegments)
  getEdiSegments(
    { patchState }: StateContext<EdiStateModel>,
    action: GetEdiSegments
  ) {
    return this.EdiSegmentService.getAllEdiSegments(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap({
        next: (response) => {
          patchState({
            ediSegments: response,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting edi segments, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetEdiConnections)
  getEdiConnections(
    { patchState }: StateContext<EdiStateModel>,
    action: GetEdiConnections
  ) {
    return this.EdiConnectionService.getAllEdiConntections(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap({
        next: (response) => {
          patchState({
            ediConnections: response,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error(
              'Error while getting edi connections, please try again later'
            );
          }
        },
      })
    );
  }

  @Action(GetEdiProfiles)
  getEdiProfiles(
    { patchState }: StateContext<EdiStateModel>,
    action: GetEdiProfiles
  ) {
    return this.EdiProfileService.getAllEdiProfiles(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap((result: EdiProfile[]) => {
        patchState({
          ediProfiles: result,
        });
      })
    );
  }

  @Action(AddEdiModel)
  addEdiModel(
    { patchState }: StateContext<EdiStateModel>,
    action: AddEdiModel
  ) {
    return this.EdiModelService.createEdiModel(action.payload.ediModel).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiModel) => {})
    );
  }

  @Action(GetEdiModel)
  getEdiModel(
    { patchState }: StateContext<EdiStateModel>,
    action: GetEdiModel
  ) {
    return this.EdiModelService.getEdiModelById(action.payload.id).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiModel) => {})
    );
  }

  @Action(UpdateEdiModel)
  updateEdiModel(
    { patchState }: StateContext<EdiStateModel>,
    action: UpdateEdiModel
  ) {
    return this.EdiModelService.updateEdiModel(action.payload.ediModel).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiModel) => {})
    );
  }

  @Action(DeleteEdiModel)
  deleteEdiModel(
    { patchState }: StateContext<EdiStateModel>,
    action: DeleteEdiModel
  ) {
    return this.EdiModelService.deleteEdiModel(action.payload.id).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiModel) => {})
    );
  }

  @Action(AddEdiOrganization)
  getEdiOrganization(
    { patchState }: StateContext<EdiStateModel>,
    action: AddEdiOrganization
  ) {
    return this.EdiOrganizationService.createEdiOrganization(
      action.payload.ediOrganization
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiOrganization) => {})
    );
  }

  @Action(UpdateEdiOrganization)
  updateEdiOrganization(
    { patchState }: StateContext<EdiStateModel>,
    action: UpdateEdiOrganization
  ) {
    return this.EdiOrganizationService.updateEdiOrganization(
      action.payload.ediOrganization
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiOrganization) => {})
    );
  }

  @Action(DeleteEdiOrganization)
  deleteEdiOrganization(
    { patchState }: StateContext<EdiStateModel>,
    action: DeleteEdiOrganization
  ) {
    return this.EdiOrganizationService.deleteEdiOrganizationById(
      action.payload.id
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiOrganization) => {})
    );
  }

  @Action(AddEdiSegment)
  addEdiSegment(
    { patchState }: StateContext<EdiStateModel>,
    action: AddEdiSegment
  ) {
    return this.EdiSegmentService.createEdiSegment(
      action.payload.ediSegment
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiSegment) => {})
    );
  }

  @Action(UpdateEdiSegment)
  updateEdiSegment(
    { patchState }: StateContext<EdiStateModel>,
    action: UpdateEdiSegment
  ) {
    return this.EdiSegmentService.updateEdiSegment(
      action.payload.ediSegment
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiSegment) => {})
    );
  }

  @Action(DeleteEdiSegment)
  deleteEdiSegment(
    { patchState }: StateContext<EdiStateModel>,
    action: DeleteEdiSegment
  ) {
    return this.EdiSegmentService.deleteEdiSegmentById(action.payload.id).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiSegment) => {})
    );
  }

  @Action(AddEdiConnection)
  addEdiConnection(
    { patchState }: StateContext<EdiStateModel>,
    action: AddEdiConnection
  ) {
    return this.EdiConnectionService.createConnection(
      action.payload.ediConnection
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiConnection) => {})
    );
  }

  @Action(UpdateEdiConnection)
  updateEdiConnection(
    { patchState }: StateContext<EdiStateModel>,
    action: UpdateEdiConnection
  ) {
    return this.EdiConnectionService.updateConnection(
      action.payload.ediConnection
    ).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiConnection) => {})
    );
  }

  @Action(DeleteEdiConnection)
  deleteEdiConnection(
    { patchState }: StateContext<EdiStateModel>,
    action: DeleteEdiConnection
  ) {
    return this.EdiConnectionService.deleteConnection(action.payload.id).pipe(
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tap((result: EdiConnection) => {})
    );
  }

  @Action(GetEdiDocumentCountReport)
  GetEdiDocumentCountReport(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiDocumentCountReport
  ) {
    return this.EdiReportService.getDocumentCountTotal(
      action.payload.startDate,
      action.payload.endDate,
      action.payload.period
    ).pipe(
      tap((result: any) => {
        ctx.patchState({
          ediDocumentCountReport: result,
        });
      })
    );
  }

  @Action(BuildAllUnBuiltDocuments)
  BuildAllUnBuiltDocuments() {
    //get auth.id from store
    const id = this.store.selectSnapshot(
      (state) => state.edi.ediDocuments[0].customer_Id
    );
    return this.EdiActionService.buildAllUnBuiltDocuments(id);
  }

  @Action(SendAllUnSentDocuments)
  SendAllUnSentDocuments() {
    //get auth.id from store
    const id = this.store.selectSnapshot(
      (state) => state.edi.ediDocuments[0].customer_Id
    );
    return this.EdiActionService.sendAllUnSentDocuments(id);
  }

  /**
   * @summary - Get total number of documents for a customer by date range
   */
  @Action(GetEdiDocumentCountByCustomerAndDateRange)
  GetEdiDocumentCountByCustomerAndDateRange(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiDocumentCountByCustomerAndDateRange
  ) {
    return this.EdiDocumentService.getTotalDocumentsByCustomerIdAndDateRange(
      action.payload.customer_Id,
      action.payload.startDate,
      action.payload.endDate
    ).pipe(
      tap({
        next: (result: any) => {
          ctx.patchState({
            ediDocumentCountReport: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting document count report');
          }
        },
      })
    );
  }

  /**
   * @summary Get total count of documents
   */
  @Action(GetEdiDocumentCount)
  GetEdiDocumentCount(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiDocumentCount
  ) {
    return this.EdiDocumentService.getTotalDocuments().pipe(
      tap({
        next: (result: any) => {
          ctx.patchState({
            ediDocumentCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting document count report');
          }
        },
      })
    );
  }

  /**
   * @summary Get total count of models
   */
  @Action(GetEdiModelCount)
  GetEdiModelCount(ctx: StateContext<EdiStateModel>, action: GetEdiModelCount) {
    return this.EdiModelService.getEdiModelCount().pipe(
      tap({
        next: (result: any) => {
          ctx.patchState({
            ediModelsCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting document count report');
          }
        },
      })
    );
  }

  /**
   * @summary Get total count of connections
   */
  @Action(GetEdiConnectionCount)
  GetEdiConnectionCount(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiConnectionCount
  ) {
    return this.EdiConnectionService.getTotalConnections().pipe(
      tap({
        next: (result: any) => {
          ctx.patchState({
            ediConnectionsCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting document count report');
          }
        },
      })
    );
  }

  /**
   * @summary Get total count of segments
   */
  @Action(GetEdiSegmentCount)
  GetEdiSegmentCount(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiSegmentCount
  ) {
    return this.EdiSegmentService.getEdiSegmentCount().pipe(
      tap({
        next: (result: any) => {
          ctx.patchState({
            ediSegmentsCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting document count report');
          }
        },
      })
    );
  }

  /**
   * @summary Get total count of profiles
   */
  @Action(GetEdiProfileCount)
  GetEdiProfileCount(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiProfileCount
  ) {
    return this.EdiProfileService.getEdiProfilesCount().pipe(
      tap({
        next: (result: any) => {
          ctx.patchState({
            ediProfilesCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting document count report');
          }
        },
      })
    );
  }

  /**
   * @summary Get total count of variables
   */
  @Action(GetEdiVariableCount)
  GetEdiVariableCount(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiVariableCount
  ) {
    return this.EdiVariableService.getEdiVariableCount().pipe(
      tap({
        next: (result: any) => {
          ctx.patchState({
            ediVariablesCount: result.count,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting document count report');
          }
        },
      })
    );
  }

  /**
   * @summary Get EdiCredits with pagination
   */
  @Action(GetEdiCredits)
  GetEdiCredits(ctx: StateContext<EdiStateModel>, action: GetEdiCredits) {
    return this.EdiCreditService.getEdiCredits(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap({
        next: (result: EdiCredit[]) => {
          ctx.patchState({
            ediCredits: result,
          });
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while getting edi credits');
          }
        },
      })
    );
  }

  /**
   * @summary Add EditCredit
   */
  @Action(AddEdiCredit)
  AddEdiCredit(ctx: StateContext<EdiStateModel>, action: AddEdiCredit) {
    return this.EdiCreditService.createEdiCredit(action.payload.ediCredit).pipe(
      tap({
        next: (result: any) => {
          this.toastr.success('Credit Added Successfully');
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while adding edi credit');
          }
        },
      })
    );
  }

  /**
   * @summary Update EdiCredit
   */
  @Action(UpdateEdiCredit)
  UpdateEdiCredit(ctx: StateContext<EdiStateModel>, action: UpdateEdiCredit) {
    return this.EdiCreditService.updateEdiCredit(action.payload.ediCredit).pipe(
      tap({
        next: (result: any) => {
          this.toastr.success('Credit Updated Successfully');
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while updating edi credit');
          }
        },
      })
    );
  }

  /**
   * @summary Delete EdiCredit
   */
  @Action(DeleteEdiCredit)
  DeleteEdiCredit(ctx: StateContext<EdiStateModel>, action: DeleteEdiCredit) {
    return this.EdiCreditService.deleteEdiCreditById(action.payload.id).pipe(
      tap({
        next: (result: any) => {
          this.toastr.success('Credit Deleted Successfully');
        },
        error: (error) => {
          //if response code is 400
          if (error.status === 400) {
            this.toastr.error('Error');
          }
          //if any other error
          else {
            this.toastr.error('Error while deleting edi credit');
          }
        },
      })
    );
  }
}
