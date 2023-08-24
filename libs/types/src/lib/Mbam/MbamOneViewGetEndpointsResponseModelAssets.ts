import { MbamOneViewGetEndpointsResponseModelVulnerabilitiesFound } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelVulnerabilitiesFound';

export interface MbamOneViewGetEndpointsResponseModelAssets {
  last_scanned_at: string;
  vulnerabilities_found: MbamOneViewGetEndpointsResponseModelVulnerabilitiesFound;
  os_patches_available: number;
}
