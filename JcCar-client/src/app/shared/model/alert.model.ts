import { Temporality } from './../services/model/temporality';
import { StatusApplication } from './../services/model/statusApplication';
import { Origin } from './../services/model/origin';
import { GoldRole } from './../services/model/goldRole';
import { Attachment } from './../services/model/attachment';
import { AlertInvolved } from './../services/model/alertInvolved';
import { AlertClass } from './../services/model/alertClass';
import { Alert } from './../services/model/alert';
import { BaseEntity } from './../../shared/model/base-entity.model';

export class AlertModel implements Alert {
    constructor(
        actionPlain?: string,
        alertClass?: AlertClass,
        alertInvolveds?: Array<AlertInvolved>,
        attachments?: Array<Attachment>,
        basicCause?: string,
        company?: string,
        createdBy?: string,
        creationDate?: string,
        description?: string,
        goldRoles?: Array<GoldRole>,
        id?: number,
        idOccurrence?: number,
        mainManagement?: string,
        occurrenceDate?: string,
        origin?: Origin,
        sendDate?: string,
        status?: StatusApplication,
        tags?: Array<string>,
        temporality?: Temporality,
        title?: string
    ) {}
}
