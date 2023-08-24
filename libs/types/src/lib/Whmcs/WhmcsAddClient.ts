export interface WhmcsAddClient {
  firstName: string;
  lastName: string;
  companyName: string | null;
  email: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phoneNumber: string;
  taxId: string | null;
  password: string;
  securityQuestionId: number;
  securityQuestionAnswer: string | null;
  currencyId: number | null;
  clientGroupId: number | null;
  customFields: string | null;
  language: string | null;
  ownerUserId: number | null;
  ipAddress: string | null;
  notes: string | null;
  marketingEmailsOptIn: boolean | null;
  noEmail: boolean | null;
  skipValidation: boolean | null;
}
