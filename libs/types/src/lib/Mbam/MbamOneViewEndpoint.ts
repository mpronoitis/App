import { MbamOneViewGetEndpointsResponseModelMachine } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelMachine';
import { MbamOneViewGetEndpointsResponseModelAgent } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelAgent';
import { MbamOneViewGetEndpointsResponseModelStats } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelStats';

export interface MbamOneViewEndpoint {
  machine: MbamOneViewGetEndpointsResponseModelMachine;
  agent: MbamOneViewGetEndpointsResponseModelAgent;
  link: string;
  stats: MbamOneViewGetEndpointsResponseModelStats;
  protection_status: string;
  display_name: string;
}
