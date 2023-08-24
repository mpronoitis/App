import { MbamOneViewGetEndpointsResponseModelPlugins } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelPlugins';
import { MbamOneViewGetEndpointsResponseModelNic } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelNic';
import { MbamOneViewGetEndpointsResponseModelSourceLocation } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelSourceLocation';
import { MbamOneViewGetEndpointsResponseModelOsInfo } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelOsInfo';

export interface MbamOneViewGetEndpointsResponseModelAgent {
  is_software_update_available: boolean;
  has_alerts: boolean;
  started_at_offset: number;
  engine_version: string;
  policy_etag: string;
  lastUser: string;
  at: string;
  started_at_local: string;
  plugins: MbamOneViewGetEndpointsResponseModelPlugins;
  nics: MbamOneViewGetEndpointsResponseModelNic[];
  group_id: string;
  fullyQualifiedHostName: string;
  machine_id: string;
  account_id: string;
  machineIp: string;
  sourceLocation: MbamOneViewGetEndpointsResponseModelSourceLocation;
  osInfo: MbamOneViewGetEndpointsResponseModelOsInfo;
  host_name: string;
  serial_number: string;
}
