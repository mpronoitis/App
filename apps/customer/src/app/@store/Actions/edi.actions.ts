import { EdiProfile } from '@play.app/types/Edi/EdiProfile';

export class GetEdiDocuments {
  static readonly type = '[Edi] Get Documents';

  constructor(
    public payload: { page: number; pageSize: number; customer_Id: string }
  ) {}
}
/**
 * @summary Get all EdiDocuments of customer with no payload and pagination
 * @param customerId - The customer id
 * @param page - The page number
 * @param pageSize - The page size
 */

export class GetEdiDocumentsNoPayload {
  static readonly type = '[Edi] Get Edi Documents No Payload';
  constructor(
    public payload: { customer_Id: string; page: number; pageSize: number }
  ) {}
}

/**
 * @summary Get EdiDocument by id
 * @param id - The document id
 */
export class GetEdiDocumentById {
  static readonly type = '[Edi] Get Document By Id';
  constructor(public payload: { id: string }) {}
}

export class GetEdiProfiles {
  static readonly type = '[Edi] Get Profiles';

  constructor(
    public payload: { page: number; pageSize: number; customer_Id: string }
  ) {}
}

export class GetEdiConnections {
  static readonly type = '[Edi] Get Connections';

  constructor(
    public payload: { page: number; pageSize: number; customer_Id: string }
  ) {}
}

export class GetEdiModels {
  static readonly type = '[Edi] Get Models';

  constructor(public payload: { page: number; pageSize: number }) {}
}

export class GetEdiDocumentCountReport {
  static readonly type = '[Edi] Get Document Count Report';

  constructor(
    public payload: {
      startDate: string;
      endDate: string;
      customerId: string;
      period: string;
    }
  ) {}
}

export class UpdateEdiProfile {
  static readonly type = '[Edi] Update Profile';

  constructor(public payload: EdiProfile) {}
}

export class CreateEdiProfile {
  static readonly type = '[Edi] Create Profile';

  constructor(public payload: EdiProfile) {}
}

//action to build all un built documents
export class BuildAllUnBuiltDocuments {
  static readonly type = '[Edi] Build All UnBuilt Documents';
}

//action to send all un sent documents
export class SendAllUnSentDocuments {
  static readonly type = '[Edi] Send All UnSent Documents';
}

//get edi credit
export class GetEdiCredit {
  static readonly type = '[Edi] Get Edi Credit';
  constructor(public payload: { customerId: string }) {}
}
