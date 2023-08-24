import { MbamOneViewGetAllDetectionsResponseModelAgent } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelAgent';
import { MbamOneViewGetAllDetectionsResponseModelLocation } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelLocation';
import { MbamOneViewGetAllDetectionsResponseModelAccount } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelAccount';
import { MbamOneViewGetAllDetectionsResponseModelGroup } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelGroup';

export interface MbamOneViewDetection {
  Agent: MbamOneViewGetAllDetectionsResponseModelAgent;
  MachineLocation: MbamOneViewGetAllDetectionsResponseModelLocation;
  SourceLocation: MbamOneViewGetAllDetectionsResponseModelLocation;
  DestinationLocation: MbamOneViewGetAllDetectionsResponseModelLocation;
  GroupId: string;
  Id: string;
  MachineId: string;
  AccountId: string;
  DetectionId: string;
  ScannedAt: Date;
  ScannedAtOffsetSeconds: number;
  ReportedAt: Date;
  threatName: string;
  category: string;
  IsRtpStreamEvent: boolean;
  ProcessName: string;
  CleanedAt: Date;
  MachineName: string;
  MachineIp: string;
  ChildTraceCount: number;
  Account: MbamOneViewGetAllDetectionsResponseModelAccount;
  IsRootDetection: boolean;
  path: string;
  type: string[];
  Status: string;
  Group: MbamOneViewGetAllDetectionsResponseModelGroup;
  LastUser: string;
  Md5: string;
  Sha256: string;
}
