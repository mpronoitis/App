import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';
import { EdiStateModel } from '../Models/EdiStateModel';
import { EdiDocumentService } from '@play.app/services/Edi/EdiDocument.service';
import {
  BuildAllUnBuiltDocuments,
  CreateEdiProfile,
  GetEdiConnections,
  GetEdiCredit,
  GetEdiDocumentById,
  GetEdiDocumentCountReport,
  GetEdiDocuments,
  GetEdiDocumentsNoPayload,
  GetEdiModels,
  GetEdiProfiles,
  SendAllUnSentDocuments,
  UpdateEdiProfile,
} from '../Actions/edi.actions';
import { tap } from 'rxjs';
import { EdiActionService } from '@play.app/services/Edi/EdiAction.service';
import { EdiProfileService } from '@play.app/services/Edi/EdiProfile.service';
import { EdiProfile } from '@play.app/types/Edi/EdiProfile';
import { EdiConnectionService } from '@play.app/services/Edi/EdiConnection.service';
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { EdiReportService } from '@play.app/services/Edi/EdiReport.service';
import { EdiModelService } from '@play.app/services/Edi/EdiModel.service';
import { EdiCreditService } from '@play.app/services/Edi/EdiCredit.service';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';

@State<EdiStateModel>({
  name: 'edi',
  defaults: {
    ediDocuments: null,
    ediDocumentsNoPayload: null,
    ediProfiles: null,
    ediDocument: null,
    ediConnections: null,
    ediCredit: null,
    ediDocumentCountReport: null,
    ediModels: null,
  },
})
@Injectable()
export class EdiState {
  constructor(
    private EdiDocumentService: EdiDocumentService,
    private EdiProfileService: EdiProfileService,
    private EdiConnectionService: EdiConnectionService,
    private EDiActionService: EdiActionService,
    private EdiReportService: EdiReportService,
    private EdiModelService: EdiModelService,
    private EdiCreditService: EdiCreditService,
    private Store: Store
  ) {}

  @Action(GetEdiDocumentById)
  GetEdiDocumentById(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiDocumentById
  ) {
    return this.EdiDocumentService.getEdiDocumentById(action.payload.id).pipe(
      tap((result: EdiDocument) => {
        ctx.patchState({
          ediDocument: result,
        });
      })
    );
  }
  @Action(GetEdiDocuments)
  GetEdiDocuments(ctx: StateContext<EdiStateModel>, action: GetEdiDocuments) {
    return this.EdiDocumentService.getEdiDocuments(
      action.payload.page,
      action.payload.pageSize,
      action.payload.customer_Id
    ).pipe(
      tap((result: EdiDocument[]) => {
        ctx.patchState({
          ediDocuments: result,
        });
      })
    );
  }

  @Action(GetEdiProfiles)
  GetEdiProfiles(ctx: StateContext<EdiStateModel>, action: GetEdiProfiles) {
    return this.EdiProfileService.getEdiProfiles(
      action.payload.customer_Id,
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap((result: EdiProfile[]) => {
        ctx.patchState({
          ediProfiles: result,
        });
      })
    );
  }

  @Action(GetEdiConnections)
  GetEdiConnections(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiConnections
  ) {
    return this.EdiConnectionService.getEdiConnections(
      action.payload.customer_Id,
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap((result: EdiConnection[]) => {
        ctx.patchState({
          ediConnections: result,
        });
      })
    );
  }

  @Action(GetEdiModels)
  GetEdiModels(ctx: StateContext<EdiStateModel>, action: GetEdiModels) {
    return this.EdiModelService.getAllEdiModels(
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap((result: EdiModel[]) => {
        ctx.patchState({
          ediModels: result,
        });
      })
    );
  }

  /**
   * @summary Action GetEdiDocumentCountReport
   * @param startDate - start date of report
   * @param endDate - end date of report
   * @param customerId - customer id
   * @param period - period of report (daily, weekly, monthly)
   *
   * @returns Observable<any>
   */
  @Action(GetEdiDocumentCountReport)
  GetEdiDocumentCountReport(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiDocumentCountReport
  ) {
    return this.EdiReportService.getDocumentCount(
      action.payload.startDate,
      action.payload.endDate,
      action.payload.customerId,
      action.payload.period
    ).pipe(
      tap((result: any) => {
        ctx.patchState({
          ediDocumentCountReport: result,
        });
      })
    );
  }

  /**
   * @summary Get EdiDocuments By CustomerId with no payload and pagination
   * @param ctc
   * @param action
   */
  @Action(GetEdiDocumentsNoPayload)
  GetEdiDocumentsNoPayload(
    ctx: StateContext<EdiStateModel>,
    action: GetEdiDocumentsNoPayload
  ) {
    return this.EdiDocumentService.getEdiDocumentsByCustomerIdNoPayload(
      action.payload.customer_Id,
      action.payload.page,
      action.payload.pageSize
    ).pipe(
      tap((result: EdiDocument[]) => {
        ctx.patchState({
          ediDocumentsNoPayload: result,
        });
      })
    );
  }

  /**
   * @summary Action CreateEdiProfile
   * @param ctx
   * @param action
   */
  @Action(CreateEdiProfile)
  CreateEdiProfile(ctx: StateContext<EdiStateModel>, action: CreateEdiProfile) {
    return this.EdiProfileService.createEdiProfile(action.payload).pipe(
      tap((result: EdiProfile) => {
        this.Store.dispatch(
          new GetEdiProfiles({
            page: 1,
            pageSize: 1000,
            customer_Id: action.payload.customer_Id,
          })
        );
      })
    );
  }

  /**
   *  @summary Action UpdateEdiProfile
   * @param ctx
   * @param action
   */
  @Action(UpdateEdiProfile)
  UpdateEdiProfile(ctx: StateContext<EdiStateModel>, action: UpdateEdiProfile) {
    return this.EdiProfileService.updateEdiProfile(action.payload).pipe(
      tap((result: EdiProfile) => {
        this.Store.dispatch(
          new GetEdiProfiles({
            page: 1,
            pageSize: 1000,
            customer_Id: action.payload.customer_Id,
          })
        );
      })
    );
  }

  @Action(BuildAllUnBuiltDocuments)
  BuildAllUnBuiltDocuments() {
    //get auth.id from store
    const id = this.Store.selectSnapshot((state) => state.auth.id);
    return this.EDiActionService.buildAllUnBuiltDocuments(id);
  }

  @Action(SendAllUnSentDocuments)
  SendAllUnSentDocuments() {
    //get auth.id from store
    const id = this.Store.selectSnapshot((state) => state.auth.id);
    return this.EDiActionService.sendAllUnSentDocuments(id);
  }

  /**
   * @summary Action Get Edi Credit By Customer Id

   */
  @Action(GetEdiCredit)
  GetEdiCredit(ctx: StateContext<EdiStateModel>, action: GetEdiCredit) {
    return this.EdiCreditService.getEdiCreditByCustomerId(
      action.payload.customerId
    ).pipe(
      tap((result: EdiCredit) => {
        ctx.patchState({
          ediCredit: result,
        });
      })
    );
  }
}
