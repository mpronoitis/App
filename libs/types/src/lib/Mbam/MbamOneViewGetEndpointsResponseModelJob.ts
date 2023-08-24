import { MbamOneViewGetEndpointsResponseModelData } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelData';

export interface MbamOneViewGetEndpointsResponseModelJob {
  machine_id: string;
  updated_at: string;
  command: string;
  created_at: string;
  expires_at: string;
  issued_by: string;
  status: string;
  data: MbamOneViewGetEndpointsResponseModelData;
  id: string;
}
