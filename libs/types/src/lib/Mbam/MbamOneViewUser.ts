import { MbamOneViewGetUsersResponseModelCustomer } from '@play.app/types/Mbam/MbamOneViewGetUsersResponseModelCustomer';

export interface MbamOneViewUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  accountid: string;
  isactive: boolean;
  isSuspended: boolean;
  roles: string[];
  customers: MbamOneViewGetUsersResponseModelCustomer[];
  hasPortalAccount: boolean;
  hasActivatedPortalAccount: boolean;
  authRoles: string[];
  cognitoUserStatus: string;
  mfaEnabled: boolean;
  nebulaUserId: string | null;
  sso_enabled: boolean;
  isVendor: boolean;
  mdr_enabled: boolean;
  twotier_adminportalaccess__c: boolean;
  name: string;
  sites: string[];
  phone: string;
  contactType: string;
  address: string;
  city: string;
  postal: string | null;
  country: string;
}
