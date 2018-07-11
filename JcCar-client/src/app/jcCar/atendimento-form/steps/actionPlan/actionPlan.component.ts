import { ResponseWrapper } from './../../../../shared/utils/response-wrapper.model';
import { ConfirmModal } from './../../../../shared/components/modal/confim/confirmModal';
import { Format, DateUtil } from './../../../../shared/utils/date-util';
import { CALENDAR_PT_BR } from './../../../../shared/constants/app.constants';
import { ActionPlan } from './../../../../shared/services/model/actionPlan';
import { ArrayUtils } from './../../../../shared/utils/arrayUtils';
import { Observable } from 'rxjs/Observable';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
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
    selector: 'action-plan',
    templateUrl: './actionPlan.component.html',
    styleUrls: ['./actionPlan.component.css'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ActionPlanComponent implements OnInit, OnDestroy {

  @Input() alert: Alert;
  @Input() alertInvolved: AlertInvolved;
  @Input() userLogin: User;
  @Input() formAlert: NgForm;

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
    this.actionPlan.rootCause = this.alert.basicCause;
    this.onGetUserOfAlert();
  }

  onGetUserOfAlert() {
      this.user = new User();
      this.user.employeeKey = this.alert.createdBy;
  }

  onAddActionPlan(form: NgForm) {
    if (!this.alertInvolved.actionsPlans) {
        this.alertInvolved.actionsPlans = [];
    }

    if (this.actionPlan.rootCause && this.actionPlan.creationDate
      && this.actionPlan.endDate && this.actionPlan.description) {
      if (!this.actionPlan.createdBy) {
        this.addNewActionPlan();
      } else {
        this.updateActionPlanOfTable();
      }
    } else {
      this._notify.onWarning('Por favor, preencha o formulário e crie um plano de ação válido! Campos com o sinal de * são obrigatórios!');
    }
    // this.involved = Object.assign({}, this.alertInvolved);
    // form.reset();
    // this.alertInvolved = this.involved;
    // form.setValue(this.alertInvolved);
  }

  private addNewActionPlan() {
    this.actionPlan.createdBy = this.userLogin.employeeKey;
    this.actionPlan.alertInvolved = {};
    this.actionPlan.status = ActionPlan.StatusActionPlanEnum.CREATED;
    // Atribui o status de plano de ação criado.
    this.alertInvolved.statusInvolved.id = StatusAlertEnum.PLANO_ACAO;
    if (this.alertInvolved.actionsPlans.length > 0
      &&  this.containsActionPlanRepeated() === false) {
      this.alertInvolved.actionsPlans.push(this.actionPlan);
      this.alertInvolved.actionsPlans.forEach((actionPlain) => {
        actionPlain.alertInvolved = {};
        actionPlain.alertInvolved.id = this.alertInvolved.id;
      });
      this.alertInvolved.actionsPlans = [...this.alertInvolved.actionsPlans];
      this._notify.onSuccess('Plano de ação adicionado com sucesso!');
    }
    if (this.alertInvolved.actionsPlans.length === 0) {
      this.actionPlan.alertInvolved.id = this.alertInvolved.id;
      this.alertInvolved.actionsPlans.push(this.actionPlan);
      this.alertInvolved.actionsPlans = [...this.alertInvolved.actionsPlans];
    }
    this.actionPlan = {};
    this.actionPlan.rootCause = this.alert.basicCause;
  }

  private updateActionPlanOfTable() {
    this.alertInvolved.actionsPlans.forEach((plan, i) => {
      if (plan.createdBy === this.actionPlan.createdBy
        && plan.id === this.actionPlan.id) {

          this.actionPlan.creationDate = DateUtil.format(this.actionPlan.creationDate);
          this.actionPlan.endDate = DateUtil.format(this.actionPlan.endDate);
          this.alertInvolved.actionsPlans[i] = this.actionPlan;
        }
    });

    this.alertInvolved.actionsPlans = [...this.alertInvolved.actionsPlans];
    this.actionPlan = {};
    this._notify.onWarning('Plano de ação alterado com sucesso!');
  }

  onEditActionPlan(actionPlanSelected: ActionPlan) {
    if (actionPlanSelected) {
      actionPlanSelected.creationDate = DateUtil.format(actionPlanSelected.creationDate);
      actionPlanSelected.endDate = DateUtil.format(actionPlanSelected.endDate);
      this.actionPlan = Object.assign({}, actionPlanSelected);
    }
  }

  containsActionPlanRepeated(): Boolean {
    let constains = false;
    this.alertInvolved.actionsPlans.forEach((plan) => {
      if (plan.description === this.actionPlan.description) {
        constains = true;
      }

      if (plan.creationDate === this.actionPlan.creationDate
        && plan.endDate === this.actionPlan.endDate) {
        constains = true;
      }
    });

    if (constains) {
      this._notify.onWarning('Este plano de ação já existe!');
    }
    return constains;
  }

  onRemoveActionPlain(actionPlain: ActionPlan) {
    this._modalService
      .open(new ConfirmModal('Confirmar', `Deseja remover o plano de ação: [ ${actionPlain.rootCause} ] ?`, ModalSize.Small))
      .onApprove(() => this.remove(actionPlain));
  }

  private remove(actionPlainSelected: ActionPlan) {
    this.alertInvolved.actionsPlans = this.alertInvolved.actionsPlans.filter(p => p !== actionPlainSelected);
    this._notify.onSuccess();
  }

  isActionPlanInvalid(): boolean {
    return !this.actionPlan.rootCause && !this.actionPlan.creationDate && !this.actionPlan.endDate
      && !this.actionPlan.description;
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
        case 'CREATED':
          return 'CRIADO';
        case ActionPlan.StatusActionPlanEnum.CREATED:
          return 'CRIADO';
        case 'SENDED':
          return 'ENVIADO PARA AVALIAÇÃO';
        case ActionPlan.StatusActionPlanEnum.SENDED:
          return 'ENVIADO PARA AVALIAÇÃO';
        case 'IN_APPROVEMENT':
          return 'EM AVALIAÇÃO';
        case ActionPlan.StatusActionPlanEnum.IN_APPROVEMENT:
          return 'EM AVALIAÇÃO';
      default:
        return 'CRIADO';
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
