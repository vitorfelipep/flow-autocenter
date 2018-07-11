import { ErrorHandler } from './../../../../../../shared/services/error-handler.service';
import { NgForm, ControlContainer } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import {
  AlertInvolved,
  ActionPlan,
  AlertResourceService,
  ScopeActionPlanService,
  EmailResourceService
} from '../../../../../../shared/services';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { EvaluationEffectivenessActionPlan } from '../../../../../../shared/services/model/evaluationEffectivenessActionPlan';
import { User } from '../../../../../../shared/model/user.model';
import { CALENDAR_PT_BR } from '../../../../../../shared';
import { EmailRequest } from '../../../../../../shared/model/emailRequest';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../../../../shared/components/notify/notify.service';
import { UserServiceAPI } from '../../../../../../shared/services/api/user.service';
import { DataBundleService } from '../../../../../../shared/services/data-bundle.service';
import { DateUtil, Format } from '../../../../../../shared/utils/date-util';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'action-plan-list',
  templateUrl: './evaluetionActionsPlansList.component.html',
  styleUrls: ['./evaluetionActionsPlansList.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class EvaluetionListActionPlanComponent implements OnInit, OnDestroy {

  @Input() alertInvolved: AlertInvolved;
  @Input() userLogin: any;
  @Input() formAlert: NgForm;

  @ViewChild('modalEvaluetion') public modalTemplate: ModalTemplate<null, string, string>;

  tabActionPlan: boolean;
  tabActivity: boolean;

  evaluationEffectivenessActionPlan: EvaluationEffectivenessActionPlan;
  actionPlanSelected: ActionPlan;
  user: User = new User();
  isDisabledJustification: Boolean = false;
  calendar_lang: Object = CALENDAR_PT_BR;
  emailRequest: EmailRequest = {};
  labelEvaluetion = 'Não eficaz';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notify: NotifyService,
    private _errorHandler: ErrorHandler,
    private _modalService: SuiModalService,
    private _alertResourceService: AlertResourceService,
    private _userService: UserServiceAPI,
    private _scopeActionPlanService: ScopeActionPlanService,
    private _emailServiceAPI: EmailResourceService,
    private _dataBundleService: DataBundleService,
    private errorHandle: ErrorHandler
  ) {
    this.tabActionPlan = true;
  }

  ngOnInit() {
    this.onLoad();
  }

  ngOnDestroy() {
    this._dataBundleService.cleanAll();
  }

  private onLoad() {
    this.evaluationEffectivenessActionPlan = {};
  }

  onSelectActionPlan(actionPlan: ActionPlan) {
    const config = new TemplateModalConfig<null, string, string>(this.modalTemplate);
    this.onFindEvaluationByIdBeforeShowForm(actionPlan);
    config.isClosable = false;
    config.transition = 'fade down';
    this._modalService.open(config);
  }

  onFindEvaluationByIdBeforeShowForm(actionPlan: ActionPlan) {
    actionPlan.creationDate = this.changeDateToFormatJson(actionPlan.creationDate);
    actionPlan.endDate = this.changeDateToFormatJson(actionPlan.endDate);
    this._scopeActionPlanService.findEvaluationByActionPlanId(actionPlan.id)
      .subscribe(resp => {
        if (resp) {
          this.evaluationEffectivenessActionPlan = resp;
          this.evaluationEffectivenessActionPlan.dateOfEvaluetion =
            DateUtil.format(this.evaluationEffectivenessActionPlan.dateOfEvaluetion);
        } else {
          this.evaluationEffectivenessActionPlan = {};
          if (this.userLogin) {
            this.evaluationEffectivenessActionPlan.measurer = this.userLogin.employeeKey;
          }
        }
        this.evaluationEffectivenessActionPlan.actionPlan = actionPlan;
        this.evaluationEffectivenessActionPlan.measured = true;
      }, error => {
        console.log(error);
        this._notify.onError(error.data);
      });
  }

  checkChangeEvaluetion(event: any) {
    if (this.evaluationEffectivenessActionPlan.effective) {
      this.labelEvaluetion = 'Aprovado';
    } else {
      this.labelEvaluetion = 'Reprovado';
    }
    this.evaluationEffectivenessActionPlan.justification = '';
  }

  onAttachmentsUploadInvolved($event) {
    console.log(event);
  }

  onSaveEvaluetionActionPlan(modal: any) {
    this.onApproveOrDisapprove();
    this.evaluationEffectivenessActionPlan.dateOfEvaluetion = this.changeDateToFormatJson(
      this.evaluationEffectivenessActionPlan.dateOfEvaluetion
    );
    this.addInvolvedInActionPlan();
    if (!this.evaluationEffectivenessActionPlan.id) {
      this.onCreateEvaluationActionPlan();
    } else {
      this.onUpdateEvaluayionActionPlan();
    }
    this.sendNotificationRequest(modal);
  }

  /**
   *
   * @param modal Send notification and create or update
   */
  sendNotificationRequest(modal: any) {
    if (this.alertInvolved.userKey) {
      this.createEmailRequestObject();
      this._emailServiceAPI.saveAndSendEmailUsingPOST(this.emailRequest)
        .subscribe((resp) => {
          modal.deny();
          this._notify.onWarning(`Notificação enviada com sucesso para ${ this.alertInvolved.company }!`);
        }, (error) => {
          console.log(error);
          this._notify.onError(error.data);
        });
    }
  }

  /**
   * TODO melhorar este método para tb enviar notificação
   * externa. Deverá ser feito modificação no objeto do envilvido?
   */
  createEmailRequestObject() {
    this.emailRequest.applicationCode = '2';
    this.emailRequest.subject = `${ this.alertInvolved.company } seu plano de ação foi avaliado!`;
    this.emailRequest.message = `<h3>O plano de ação de código: ${ this.evaluationEffectivenessActionPlan.actionPlan.id } foi avaliado</h3>
      <p>Avaliação: ${ this.getApproved() } </p>
      <p>Justificativa da avaliação:</p>
      <span>${ this.evaluationEffectivenessActionPlan.justification }</span>
      <p></p>
      <p></p>
      <p>Atenciosamente,</p>
      <p>Equipe SMS - Petrobras</p>`;
    const user: string = this.userLogin.employeeKey;
    this.emailRequest.from = user.toUpperCase();
    this.emailRequest.to = [];
    this.emailRequest.to.push(this.alertInvolved.userKey.toUpperCase());

  }

  getApproved(): string {
    return this.evaluationEffectivenessActionPlan.effective ? 'Aprovado' : 'Reprovado';
  }

  onCreateEvaluationActionPlan() {
    this._scopeActionPlanService.createEvaluationEffectivenessActionPlan(this.evaluationEffectivenessActionPlan)
      .subscribe((resp: EvaluationEffectivenessActionPlan) => {
      this.chooseMessageSuccessForEvaluation(resp);
    }, (error) => {
      console.log(error);
      this._notify.onError(error.data);
    });
  }

  onUpdateEvaluayionActionPlan() {
    this._scopeActionPlanService.updateEvaluation(this.evaluationEffectivenessActionPlan.id, this.evaluationEffectivenessActionPlan)
      .subscribe((resp: EvaluationEffectivenessActionPlan) => {
      this.chooseMessageSuccessForEvaluation(resp);
    }, (error) => {
      console.log(error);
      this._notify.onError(error.data);
    });
  }

  chooseMessageSuccessForEvaluation(resp: EvaluationEffectivenessActionPlan) {
    let messageEffective = ' reprovado ';
    if (resp.effective) {
      messageEffective = ' aprovado ';
    }
    this._notify.onSuccess('Plano de ação' + messageEffective + 'com sucesso!');
  }

  onApproveOrDisapprove() {
    this.alertInvolved.actionsPlans.forEach(actionPlan => {
      if (actionPlan.id === this.evaluationEffectivenessActionPlan.actionPlan.id ) {
        if (this.evaluationEffectivenessActionPlan.effective) {
          this.evaluationEffectivenessActionPlan.actionPlan.status = ActionPlan.StatusActionPlanEnum.APPROVED;
        } else {
          this.evaluationEffectivenessActionPlan.actionPlan.status = ActionPlan.StatusActionPlanEnum.DISAPPROVED;
        }
        actionPlan = this.evaluationEffectivenessActionPlan.actionPlan;
      }
    });
  }

  changeDateToFormatJson(date: any): any {
    return DateUtil.formatLocalDateTime(date, Format.dateUS);
  }

  addInvolvedInActionPlan() {
    if (this.evaluationEffectivenessActionPlan
      && this.evaluationEffectivenessActionPlan.actionPlan) {
        this.evaluationEffectivenessActionPlan.actionPlan.alertInvolved = {};
        this.evaluationEffectivenessActionPlan.actionPlan.alertInvolved.id = this.alertInvolved.id;
    }
  }

  getLabelStatusEnum(status): string {
    switch (status) {
      case ActionPlan.StatusActionPlanEnum.APPROVED:
        return 'APROVADO';
        case ActionPlan.StatusActionPlanEnum.DISAPPROVED:
        return 'REPROVADO';
      case 'APPROVED':
          return 'APROVADO';
      default:
        return 'NÃO APROVADO';
    }
  }

  getIconForEvaluetionActionPlan(statusActionPlan: any): string {
    let classEvaluation = 'fa fa-thumbs-down desapproved';
    if (statusActionPlan === 'APPROVED') {
      classEvaluation = 'fa fa-thumbs-up approved';
    }
    if (statusActionPlan === ActionPlan.StatusActionPlanEnum.APPROVED) {
      classEvaluation = 'fa fa-thumbs-up approved';
    }

    if (statusActionPlan === 'IN_APPROVEMENT') {
      classEvaluation = 'fa fa-exclamation desapproved';
    }
    return  classEvaluation;
  }
}
