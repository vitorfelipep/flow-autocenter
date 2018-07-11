import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { NotificationModel } from './../../shared/model/notification.model';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input('notifications') notificationList: NotificationModel[] = [];

    constructor() { }

    ngOnInit() {
    }

}
