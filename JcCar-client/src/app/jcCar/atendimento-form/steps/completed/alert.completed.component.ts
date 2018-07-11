import { ResponseWrapper } from './../../../../shared/utils/response-wrapper.model';
import { ConfirmModal } from './../../../../shared/components/modal/confim/confirmModal';
import { Format, DateUtil } from './../../../../shared/utils/date-util';
import { CALENDAR_PT_BR } from './../../../../shared/constants/app.constants';
import { ActionPlan } from './../../../../shared/services/model/actionPlan';
import { ArrayUtils } from './../../../../shared/utils/arrayUtils';
import { Observable } from 'rxjs/Observable';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataBundleService } from './../../../../shared/services/data-bundle.service';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
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
    selector: 'alert-completed',
    templateUrl: './alert.completed.component.html',
    styleUrls: ['./alert.completed.component.css'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AlertCompletedComponent implements OnInit, OnDestroy {

  @Input() alert: Alert;
  @Input() alertInvolved: AlertInvolved;
  @Input() userLogin: User;
  @Input() formAlert: NgForm;

  @ViewChild('modalReportAlertConclused') public modalTemplate: ModalTemplate<null, string, string>;

  actionPlan: ActionPlan = {};
  involved: AlertInvolved;
  user: User = new User();
  isDisabledJustification: Boolean = false;
  calendar_lang: Object = CALENDAR_PT_BR;

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
  ) { }

  ngOnInit() {
    if (this.alertInvolved && !this.alertInvolved.comprehensiveness) {
        this.alertInvolved.comprehensiveness = false;
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

  getComprehensiveness(): string {
    if (this.alert.alertClassification && this.alert.alertClassification.name !== 'AMARELO') {
      return this.alertInvolved.comprehensiveness ? 'Alerta Abrangente' : 'Alerta não abrangente';
    }
    return 'Sem abrangência';
  }

  getAlertClassification(): string {
    return this.alert && this.alert.alertClassification ? this.alert.alertClassification.name : 'N/A';
  }

  getJustificationForNotApplicable(): string {
    return this.alertInvolved.justificationForNotApplicable ? this.alertInvolved.justificationForNotApplicable : 'N/A';
  }

  getTemporality(): string {
    return this.alert && this.alert.temporality ? this.alert.temporality.description : 'N/A';
  }

  onOpenRelAlert() {
    const config = new TemplateModalConfig<null, string, string>(this.modalTemplate);
    config.isClosable = true;
    config.transition = 'fade down';
    this._modalService.open(config);
  }

  print(printSectionId) {
    window.print();
  }

  getLabelStatusEnum(status): string {
      switch (status) {
        case ActionPlan.StatusActionPlanEnum.APPROVED:
          return 'APROVADO';
        case ActionPlan.StatusActionPlanEnum.DISAPPROVED:
          return 'REPROVADO';
        case 'APPROVED':
            return 'APROVADO';
        case 'REPROVED':
          return 'REPROVADO';
      default:
        return 'NÃO APROVADO';
    }
  }

  getColorForStatusActionPlan(status: any): string {
    switch (status) {
      case ActionPlan.StatusActionPlanEnum.APPROVED:
        return 'approved-action-plan';
      case ActionPlan.StatusActionPlanEnum.DISAPPROVED:
        return 'disapproved-action-plan';
      case 'APPROVED':
          return 'approved-action-plan';
      case 'REPROVED':
        return 'disapproved-action-plan';
    default:
      return 'not-approved';
    }
  }
}
