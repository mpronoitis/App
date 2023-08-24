import { MbamOneViewGetUsersResponseModelAccountOwner } from '@play.app/types/Mbam/MbamOneViewGetUsersResponseModelAccountOwner';

export interface MbamOneViewGetUsersResponseModelCustomer {
  id: string;
  accountid: string;
  companyName: string;
  account_owner: MbamOneViewGetUsersResponseModelAccountOwner[];
  firstname: string;
  lastname: string;
  email: string;
  is_removed: boolean;
  createddate: string;
  createdbyid: string;
  lastmodifiedbyid: string;
  lastmodifieddate: string;
  nebula_account_status: string;
  nebula_account_id: string;
  nebula_account_token: string;
  no_subscription: boolean;
  cloud_evaluation: boolean;
  utility: boolean;
  nfr: boolean;
  billing_date: number;
  workstation_installed: boolean;
  server_installed: boolean;
  mdr_enabled: boolean;
  site_end_date: string | null;
}
