import { MbamOneViewGetAllDetectionsResponseModelNic } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelNic';
import { MbamOneViewGetAllDetectionsResponseModelPlugins } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelPlugins';
import { MbamOneViewGetAllDetectionsResponseModelOsInfo } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelOsInfo';
import { MbamOneViewGetAllDetectionsResponseModelAggregations } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelAggregations';

export interface MbamOneViewGetAllDetectionsResponseModelAgent {
  HasAlerts: boolean;
  StartedAtOffset: number;
  at: Date;
  EngineVersion: string;
  PolicyEtag: string;
  lastUser: string;
  Alerts: MbamOneViewGetAllDetectionsResponseModelAggregations;
  StartedAtLocal: Date;
  Nics: MbamOneViewGetAllDetectionsResponseModelNic[];
  IsSoftwareUpdateAvailable: boolean;
  Plugins: MbamOneViewGetAllDetectionsResponseModelPlugins;
  HostName: string;
  FullyQualifiedHostName: string;
  OsInfo: MbamOneViewGetAllDetectionsResponseModelOsInfo;
  MachineId: string;
  MachineIp: string;
  SerialNumber: string;
  ObjectGuid: string;
}
