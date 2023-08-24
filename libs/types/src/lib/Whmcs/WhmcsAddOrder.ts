export interface WhmcsAddOrder {
  clientId: number;
  paymentMethod: string;
  productIds: number[] | null;
  domainNames: string[] | null;
  billingCycles: string[] | null;
  domainRegTypes: string[] | null;
  domainRegPeriods: number[] | null;
  domainIdnLangs: string[] | null;
  domainEppCodes: string[] | null;
  firstNameserver: string | null;
  secondNameserver: string | null;
  thirdNameserver: string | null;
  fourthNameserver: string | null;
  fifthNameserver: string | null;
  customFields: string[] | null;
  configOptions: string[] | null;
  overridePrice: number[] | null;
  promoCode: string | null;
  promoOverride: boolean;
  affiliateId: number;
  noInvoice: boolean;
  noInvoiceEmail: boolean;
  noEmail: boolean;
  addons: string | null;
  serverHostname: string | null;
  serverNameserver1: string | null;
  serverNameserver2: string | null;
  serverRootPassword: string | null;
  domainContactId: number;
  domainDnsManagement: boolean;
  tldSpecificFields: string[] | null;
  domainEmailForwarding: boolean;
  domainIdProtection: boolean;
  domainOverridePrice: number[] | null;
  domainOverrideRenewalPrice: number[] | null;
  domainRenewals: string[] | null;
  ipAddress: string | null;
  addonId: number;
  addonIds: number[] | null;
  addonServiceIds: number[] | null;
}
