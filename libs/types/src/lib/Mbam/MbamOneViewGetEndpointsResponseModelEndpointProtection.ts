import { MbamOneViewGetEndpointsResponseModelProtectionStatus } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelProtectionStatus';

export interface MbamOneViewGetEndpointsResponseModelEndpointProtection {
  sdk_version: string;
  product_name: string;
  plugin_version: string;
  update_package_version: string;
  component_package_version: string;
  reboot_reasons: number;
  protection_status: MbamOneViewGetEndpointsResponseModelProtectionStatus;
  update_package_pub_version: string;
}
