import { BusinessTypeMessage } from './../../model/enumaration/business-message-type.enum';
import { Injectable } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class NotifyService {

  constructor(public toastr: ToastsManager) { }

  onDisplayMessage(type?: Number, messages?: Array<string>) {
    switch (type) {
      case BusinessTypeMessage.ERROR: {
        this.onError(this.messageBuilder(messages));
        break;
      }
      case BusinessTypeMessage.INFO: {
        this.onInfo(this.messageBuilder(messages));
        break;
      }
      case BusinessTypeMessage.WARNING: {
        this.onWarning(this.messageBuilder(messages));
        break;
      }
      default: {
        this.onSuccess(this.messageBuilder(messages));
        break;
      }
    }
  }

  onSuccess(message: string = 'Operação efetuada', title: string = 'SUCESSO') {
    this.toastr.success(message, title);
  }

  onError(message: string = 'Operação não efetuada', title: string = 'ERRO') {
    this.toastr.error(message, title);
  }

  onWarning(message: string = 'Operação efetuada', title: string = 'ATENÇÃO') {
    this.toastr.warning(message, title);
  }

  onInfo(message: string = 'Operação efetuada', title: string = 'INFORMAÇÃO') {
    this.toastr.info(message, title);
  }

  private messageBuilder(messages: Array<string>) {
    let msgBack = '';
    messages.forEach(element => {
      msgBack = msgBack + element + '\n';
    });
    return msgBack;
  }

}
