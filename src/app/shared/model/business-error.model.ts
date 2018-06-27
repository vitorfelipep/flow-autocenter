import { BusinessTypeMessage } from './enumaration/business-message-type.enum';

export class BusinessError {

    constructor(
        public businessTypeMessage?: BusinessTypeMessage,
        public debugMessages?: Array<string>,
        public messages?: Array<string>,
        public timestamp?: string,
    ) {
    }
}
