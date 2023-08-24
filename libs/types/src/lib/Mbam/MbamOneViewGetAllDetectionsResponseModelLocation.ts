import { MbamOneViewGetAllDetectionsResponseModelPoint } from '@play.app/types/Mbam/MbamOneViewGetAllDetectionsResponseModelPoint';

export interface MbamOneViewGetAllDetectionsResponseModelLocation {
  City: string;
  Continent: string;
  CountryIso: string;
  AccuracyRadius: number;
  Point: MbamOneViewGetAllDetectionsResponseModelPoint;
  AnonymousProxy: boolean;
  Subdivisions: string[];
  Country: string;
  TimeZone: string;
  PostalCode: string;
}
