import { MbamOneViewUser } from '@play.app/types/Mbam/MbamOneViewUser';
import { MbamOneViewSite } from '@play.app/types/Mbam/MbamOneViewSite';
import { MbamOneViewEndpoint } from '@play.app/types/Mbam/MbamOneViewEndpoint';
import { MbamOneViewDetection } from '@play.app/types/Mbam/MbamOneViewDetection';

export interface MbamStateModel {
  users: MbamOneViewUser[] | null;
  sites: MbamOneViewSite[] | null;
  endpoints: MbamOneViewEndpoint[] | null;
  siteCount: number | null;
  userCount: number | null;
  detections: MbamOneViewDetection[] | null;
}
