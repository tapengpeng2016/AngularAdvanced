import { Geo } from "./geo.model";

export interface Address{
  city?: string;
  street?: string;
  suite?: string;
  zipcode?: string;
  geo?: Geo;

}
