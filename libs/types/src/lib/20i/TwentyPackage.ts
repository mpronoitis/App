export interface PackageLabel {
  label: string;
}

export interface TwentyPackage {
  id: number;
  beingManaged: boolean;
  created: Date;
  enabled: boolean;
  externalId: string;
  location: string;
  name: string;
  names: string[];
  packageTypeName: string;
  packageTypePlatform: string;
  platform: string;
  productSpec?: any;
  serviceType: string;
  stackUsers: string[];
  typeRef: number;
  packageLabels: PackageLabel[];
}
