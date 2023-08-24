import { MbamOneViewGetEndpointsResponseModelPoint } from '@play.app/types/Mbam/MbamOneViewGetEndpointsResponseModelPoint';

export interface MbamOneViewGetEndpointsResponseModelSourceLocation {
  city: string;
  country: string;
  countryIso: string;
  continent: string;
  accuracy_radius: number;
  point: MbamOneViewGetEndpointsResponseModelPoint;
  time_zone: string;
  subdivisions: string[];
  anonymous_proxy: boolean;
}
