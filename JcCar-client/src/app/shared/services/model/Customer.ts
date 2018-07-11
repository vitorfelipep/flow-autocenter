import { Car } from './Car';

export interface Customer {
  id?: number;
  name?: string;
  cars?: Array<Car>;
}
