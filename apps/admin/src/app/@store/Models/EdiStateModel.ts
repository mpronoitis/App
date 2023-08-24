import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { EdiOrganization } from '@play.app/types/Edi/EdiOrganization';
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';
import { EdiProfile } from '@play.app/types/Edi/EdiProfile';
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
export interface EdiStateModel {
  ediModels: EdiModel[] | null;
  ediOrganizations: EdiOrganization[] | null;
  ediSegments: EdiSegment[] | null;
  ediConnections: EdiConnection[] | null;
  ediProfiles: EdiProfile[] | null;
  ediVariables: EdiVariable[] | null;
  ediDocuments: EdiDocument[] | null;
  ediCredits: EdiCredit[] | null;
  ediDocumentCountReport: any;
  ediDocumentCount: number | null;
  ediModelsCount: number | null;
  ediSegmentsCount: number | null;
  ediVariablesCount: number | null;
  ediProfilesCount: number | null;
  ediConnectionsCount: number | null;
}
