import { ResponseWrapper } from './../../../../shared/utils/response-wrapper.model';
import { ConfirmModal } from './../../../../shared/components/modal/confim/confirmModal';
import { Format, DateUtil } from './../../../../shared/utils/date-util';
import { CALENDAR_PT_BR } from './../../../../shared/constants/app.constants';
import { ActionPlan } from './../../../../shared/services/model/actionPlan';
import { ArrayUtils } from './../../../../shared/utils/arrayUtils';
import { Observable } from 'rxjs/Observable';
import { SuiModalService } from 'ng2-semantic-ui';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataBundleService } from './../../../../shared/services/data-bundle.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';

import { Alert } from './../../../../shared/services/model/alert';
import { AlertInvolved } from './../../../../shared/services/model/alertInvolved';
import { User } from './../../../../shared/model/user.model';

import { StatusAlertEnum } from './../../../../shared/model/enumaration/status.alert';
import { environment } from './../../../../../environments/environment.prod';
import { Origin } from '../../../../shared/services';
import { GoldRoleResourceService } from './../../../../shared/services/api/goldRoleResource.service';
import { OriginResourceService } from './../../../../shared/services/api/originResource.service';
import { ClassAlertResourceService } from './../../../../shared/services/api/classAlertResource.service';

import { NotifyService } from './../../../../shared/components/notify/notify.service';
import { AlertResourceService } from './../../../../shared/services/api/alertResource.service';
import { UserServiceAPI } from './../../../../shared/services/api/user.service';
import { Action } from 'rxjs/scheduler/Action';
import { INVALID } from '@angular/forms/src/model';
import { Calendar } from 'primeng/primeng';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'evaluetion-action-plan',
    templateUrl: './evaluetion.component.html',
    styleUrls: ['./evaluetion.component.css'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class EvaluetionActionPlanComponent implements OnInit, OnDestroy {

  @Input() alert: Alert;
  @Input() alertInvolved: AlertInvolved;
  @Input() userLogin: User;
  @Input() formAlert: NgForm;

  tabActionPlan: boolean;
  tabActivity: boolean;

  involved: AlertInvolved;
  user: User = new User();

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _notify: NotifyService,
      private _errorHandler: ErrorHandler,
      private _modalService: SuiModalService,
      private _alertResourceService: AlertResourceService,
      private _userService: UserServiceAPI,
      private _dataBundleService: DataBundleService,
      private errorHandle: ErrorHandler
  ) { this.tabActionPlan = true; }

  ngOnInit() {
    if (this._dataBundleService.getField()) {
      // this.alert = this._dataBundleService.getField();
    }
    this.onLoad();
  }

  ngOnDestroy() {
      this._dataBundleService.cleanAll();
  }

  private onLoad() {
      this.onGetUserOfAlert();
  }

  onGetUserOfAlert() {
      this.user = new User();
      this.user.employeeKey = this.alert.createdBy;
  }

  isNonComprehensive(): boolean {
    return this.alertInvolved && this.alertInvolved.statusInvolved && (this.alertInvolved.comprehensiveness === false)
      && (this.alertInvolved.statusInvolved.id >= StatusAlertEnum.AVALIADO_NAO_ABRANGENTE);
  }

  isComprehensiveness(): boolean {
    return this.alertInvolved && this.alertInvolved.comprehensiveness === true
      && (this.alertInvolved.actionsPlans && this.alertInvolved.actionsPlans.length > 0);
  }

  onChangeTab(tab: string) {
    console.log(tab); // TODO
  }

}
