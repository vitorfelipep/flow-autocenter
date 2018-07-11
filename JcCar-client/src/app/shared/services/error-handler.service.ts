import { BusinessError } from './../model/business-error.model';
import { NotifyService } from './../components/notify/notify.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorHandler {

    constructor(
        private notify: NotifyService) {
    }

    handle(errorResponse: BusinessError) {
        this.notify.onDisplayMessage(errorResponse.businessTypeMessage, errorResponse.messages);
    }
}
