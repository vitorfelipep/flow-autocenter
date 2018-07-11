import { BaseEntity } from './../../shared/model/base-entity.model';

export class NotificationModel implements BaseEntity {

    constructor(
        public id?: number,
        public avisoId?: number,
        public tipoAvisoId?: number,
        public idRef?: number,
        public dataAviso?: string,
        public chaveUsuarioAvisado?: string,
        public mensagem?: string,
        public lido?: boolean,
        public dataLeitura?: string
    ) { }
}