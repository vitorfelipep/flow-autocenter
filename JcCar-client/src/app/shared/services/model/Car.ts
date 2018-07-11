import { CarModel } from './CarModel';

export interface Car {
  vin?: string;
  year?: string;
  brand?: string;
  color?: string;
  board?: string;
  model?: CarModel;
}
