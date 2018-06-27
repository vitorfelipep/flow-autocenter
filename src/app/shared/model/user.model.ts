import { BaseEntity } from './../../shared/model/base-entity.model';

export class User implements BaseEntity {
    constructor(
        public id?: number,
        public employeeId?: number,
        public employeeName?: string,
        public employeeKey?: string,
        public department?: string,
        public company?: string
    ) {}
}
