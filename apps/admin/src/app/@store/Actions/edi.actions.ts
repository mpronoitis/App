import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { EdiOrganization } from '@play.app/types/Edi/EdiOrganization';
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';

export class GetEdiModels {
  static readonly type = '[Edi] Get Edi Models';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class GetEdiOrganizations {
  static readonly type = '[Edi] Get Edi Organizations';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class GetEdiSegments {
  static readonly type = '[Edi] Get Edi Segments';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class GetEdiProfiles {
  static readonly type = '[Edi] Get Edi Profiles';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class GetEdiConnections {
  static readonly type = '[Edi] Get Edi Connections';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class AddEdiConnection {
  static readonly type = '[Edi] Add Edi Connection';

  constructor(public payload: { ediConnection: EdiConnection }) {}
}

export class UpdateEdiConnection {
  static readonly type = '[Edi] Update Edi Connection';

  constructor(public payload: { ediConnection: EdiConnection }) {}
}

export class DeleteEdiConnection {
  static readonly type = '[Edi] Delete Edi Connection';

  constructor(public payload: { id: number }) {}
}

export class AddEdiModel {
  static readonly type = '[Edi] Add Edi Model';

  constructor(public payload: { ediModel: EdiModel }) {}
}

export class GetEdiModel {
  static readonly type = '[Edi] Get Edi Model';

  constructor(public payload: { id: number }) {}
}

export class GetEdiVariables {
  static readonly type = '[Edi] Get Edi Variables';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class AddEdiVariable {
  static readonly type = '[Edi] Add Edi Variable';

  constructor(public payload: { ediVariable: EdiVariable }) {}
}

export class UpdateEdiVariable {
  static readonly type = '[Edi] Update Edi Variable';

  constructor(public payload: { ediVariable: EdiVariable }) {}
}

export class DeleteEdiVariable {
  static readonly type = '[Edi] Delete Edi Variable';

  constructor(public payload: { id: number }) {}
}

export class UpdateEdiModel {
  static readonly type = '[Edi] Update Edi Model';

  constructor(public payload: { ediModel: EdiModel }) {}
}

export class DeleteEdiModel {
  static readonly type = '[Edi] Delete Edi Model';

  constructor(public payload: { id: number }) {}
}

export class AddEdiOrganization {
  static readonly type = '[Edi] Add Edi Organization';
  constructor(public payload: { ediOrganization: EdiOrganization }) {}
}

export class GetEdiOrganization {
  static readonly type = '[Edi] Get Edi Organization';
  constructor(public payload: { id: number }) {}
}

export class UpdateEdiOrganization {
  static readonly type = '[Edi] Update Edi Organization';
  constructor(public payload: { ediOrganization: EdiOrganization }) {}
}

export class DeleteEdiOrganization {
  static readonly type = '[Edi] Delete Edi Organization';
  constructor(public payload: { id: number }) {}
}

export class AddEdiSegment {
  static readonly type = '[Edi] Add Edi Segment';
  constructor(public payload: { ediSegment: EdiSegment }) {}
}

export class GetEdiSegment {
  static readonly type = '[Edi] Get Edi Segment';
  constructor(public payload: { id: number }) {}
}

export class UpdateEdiSegment {
  static readonly type = '[Edi] Update Edi Segment';
  constructor(public payload: { ediSegment: EdiSegment }) {}
}

export class DeleteEdiSegment {
  static readonly type = '[Edi] Delete Edi Segment';
  constructor(public payload: { id: number }) {}
}

export class GetEdiDocumentCountReport {
  static readonly type = '[Edi] Get Document Count Report';

  constructor(
    public payload: {
      startDate: string;
      endDate: string;
      period: string;
    }
  ) {}
}

export class GetEdiDocuments {
  static readonly type = '[Edi] Get Edi Documents';

  constructor(public payload: { page: number; pageSize: number }) {}
}

//action to build all un built documents
export class BuildAllUnBuiltDocuments {
  static readonly type = '[Edi] Build All UnBuilt Documents';
}

//action to send all un sent documents
export class SendAllUnSentDocuments {
  static readonly type = '[Edi] Send All UnSent Documents';
}

/**
 * @summary - Get total number of documents for a customer by date range
 * @param customer_Id - The customer id
 * @param startDate - The start date
 * @param endDate - The end date
 */
export class GetEdiDocumentCountByCustomerAndDateRange {
  static readonly type = '[Edi] Get Document Count By Customer And Date Range';
  constructor(
    public payload: {
      customer_Id: string;
      startDate: string;
      endDate: string;
    }
  ) {}
}

/**
 * @summary Get total count of documents
 */
export class GetEdiDocumentCount {
  static readonly type = '[Edi] Get Document Count';
}

/**
 * @summary Get total count of variables
 */
export class GetEdiVariableCount {
  static readonly type = '[Edi] Get Variable Count';
}

/**
 * @summary Get total count of models
 */
export class GetEdiModelCount {
  static readonly type = '[Edi] Get Model Count';
}

/**
 * @summary Get total count of connections
 */
export class GetEdiConnectionCount {
  static readonly type = '[Edi] Get Connection Count';
}

/**
 * @summary Get total count of profiles
 */
export class GetEdiProfileCount {
  static readonly type = '[Edi] Get Profile Count';
}

/**
 * @summary Get total count of segments
 */
export class GetEdiSegmentCount {
  static readonly type = '[Edi] Get Segment Count';
}

/**
 * @summary Get All EdiCredits with paging
 */

export class GetEdiCredits {
  static readonly type = '[Edi] Get Edi Credits';
  constructor(public payload: { page: number; pageSize: number }) {}
}

/**
 * @summary Get EdiCredit by Id
 * @param id - The id of the EdiCredit
 */
export class GetEdiCredit {
  static readonly type = '[Edi] Get Edi Credit';
  constructor(public payload: { id: number }) {}
}

/**
 * @summary Add EdiCredit
 * @param ediCredit - The EdiCredit to add
 */
export class AddEdiCredit {
  static readonly type = '[Edi] Add Edi Credit';
  constructor(public payload: { ediCredit: EdiCredit }) {}
}

/**
 * @summary Update EdiCredit
 * @param ediCredit - The EdiCredit to update
 */
export class UpdateEdiCredit {
  static readonly type = '[Edi] Update Edi Credit';
  constructor(public payload: { ediCredit: EdiCredit }) {}
}

/**
 * @summary Delete EdiCredit
 * @param id - The id of the EdiCredit to delete
 */
export class DeleteEdiCredit {
  static readonly type = '[Edi] Delete Edi Credit';
  constructor(public payload: { id: number }) {}
}

/**
 * @summary Get EdiCredit by Customer Id
 * @param customerId - The customer id
 */
export class GetEdiCreditByCustomerId {
  static readonly type = '[Edi] Get Edi Credit By Customer Id';
  constructor(public payload: { customerId: string }) {}
}
