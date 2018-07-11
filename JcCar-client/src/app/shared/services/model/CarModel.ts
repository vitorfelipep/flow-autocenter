import { Manufacturer } from './Manufacturer';

export interface CarModel {
  id?: number;
  name?: string;
  version?: string;
  motor?: string;
  manufacturer?: Manufacturer;
}
