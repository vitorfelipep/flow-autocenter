import { Car } from './Car';
import { Customer } from './Customer';
/**
 * @author Vitor felipe
 */
export interface Atendimento {
  id?: number;
  cliente?: Customer;
  mecanico?: string;
  horaInicio?: string;
  horaTerminoEstimativa?: string;
  horaTermino?: string;
  tipoAtendimento?: string;
  statusAtendimento?: string;
  tiposDeServicoRealizados?: Array<string>;
  descricaoCasoTipoServicoOutros?: string;
  description?: string;
  car?: Car;

}
