import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';
import { EdiProfile } from '@play.app/types/Edi/EdiProfile';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';

export interface EdiStateModel {
  ediDocuments: EdiDocument[] | null;
  ediDocument: EdiDocument | null; //single edi document
  ediProfiles: EdiProfile[] | null;
  ediConnections: EdiConnection[] | null;
  ediModels: EdiModel[] | null;
  ediCredit: EdiCredit | null;
  ediDocumentCountReport: any;
  ediDocumentsNoPayload: EdiDocument[] | null;
}
