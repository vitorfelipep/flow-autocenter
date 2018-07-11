import { NotificationUtil } from './../../../../../../../shared/utils/notification.utils';
import { ScopeEvaluationService } from './../../../../../../../shared/services/api/scopeEvaluationResource.service';
import { StatusApplication } from './../../../../../../../shared/services/model/statusApplication';
/*
 * Utils and Cores
 */
import { ControlContainer, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SuiModalService, ModalTemplate, TemplateModalConfig } from 'ng2-semantic-ui';
import { Input, OnInit, OnDestroy, ErrorHandler, Component, ViewChild } from '@angular/core';

import { DataBundleService } from '../../../../../../../shared/services/data-bundle.service';
import { DateUtil, Format } from '../../../../../../../shared/utils/date-util';
import { CALENDAR_PT_BR } from '../../../../../../../shared';

/*
* Services
*/
import { NotifyService } from '../../../../../../../shared/components/notify/notify.service';
import { AlertResourceService, ActionPlan, EmailResourceService } from '../../../../../../../shared/services';
import { UserServiceAPI } from '../../../../../../../shared/services/api/user.service';
import {
  NonComprehensiveChatResourceService
} from '../../../../../../../shared/services/api/nonComprehensiveChatResource.service';

/**
 * Models
 */
import { ChatEvaluationComprehension } from './../../../../../../../shared/services/model/chatEvaluationComprehension';
import { ComprehensiveEvaluation } from './../../../../../../../shared/services/model/comprehensiveEvaluation';
import { User } from '../../../../../../../shared/model/user.model';
import { AlertInvolved } from '../../../../../../../shared/services/model/alertInvolved';
import { Alert } from '../../../../../../../shared/services/model/alert';
import { StatusAlertEnum } from '../../../../../../../shared/model/enumaration/status.alert';


@Component({
    selector: 'app-time-line',
    templateUrl: './timeLine.component.html',
    styleUrls: ['./timeLine.component.css'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TimeLineComponent implements OnInit, OnDestroy {

  @ViewChild('modalNotComprehesive')
  public modalTemplate: ModalTemplate<null, string, string>;

  @Input() listChatEvaluation: Array<ChatEvaluationComprehension>;
  @Input() alertInvolved: AlertInvolved;
  @Input() alert: Alert;
  @Input() userLogin: User;
  @Input() formAlert: NgForm;

  chatEvaluationComprehensive: ChatEvaluationComprehension = {};
  comprehensiveEvaluation: ComprehensiveEvaluation = {};
  user: User = new User();
  isDisabledJustification: Boolean = false;
  textRated = 'Não aprovado';

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _notify: NotifyService,
      private _emailUtil: NotificationUtil,
      private _errorHandler: ErrorHandler,
      private _modalService: SuiModalService,
      private _userService: UserServiceAPI,
      private _chatEvaluationChatService: NonComprehensiveChatResourceService,
      private _evaluationService: ScopeEvaluationService,
      private _emailService: EmailResourceService,
      private _dataBundleService: DataBundleService,
      private errorHandle: ErrorHandler
  ) { }

  ngOnInit() {
      this.onLoad();
      setTimeout(
          () => {
            if (this.listChatEvaluation.length === 0) {
              this.chatEvaluationComprehensive.message = this.alertInvolved.justificationForNotApplicable;
            }
          },
          400
      );
  }

  ngOnDestroy() {
      this._dataBundleService.cleanAll();
  }

  private onLoad() {
    if (!this.chatEvaluationComprehensive.id) {
      // console.log(this.listChatEvaluation);
    }
  }

  onClickEvaluation(chatEvaluationComprehensive: ChatEvaluationComprehension, index: number) {
    const lenghtChat = this.listChatEvaluation.length - 1;
    if (lenghtChat === index) {
      const config = new TemplateModalConfig<null, string, string>(this.modalTemplate);
      this.createNewChatEvaluationComprehensiveness();
      this.getUserLoginToResponse(chatEvaluationComprehensive);
      config.isClosable = false;
      config.transition = 'fade down';
      this._modalService.open(config);
    }
  }

  getDiffDays(index: number, chatEvaluation: ChatEvaluationComprehension): any {
    if (index === 0) {
      const diffDaysOfFirstRespnse = DateUtil.diffDay(DateUtil.formatDateTime(this.alertInvolved.responsedDate));
      return isNaN(diffDaysOfFirstRespnse)  ? this.getMinutesSecondsOrHours(diffDaysOfFirstRespnse)
        : 'Respondido há ' + diffDaysOfFirstRespnse + ' dia(s) atrás';
    }

    if (chatEvaluation && chatEvaluation.senDateMassage) {
      const diff = DateUtil.diffDay(DateUtil.formatDateTime(chatEvaluation.senDateMassage));
      if (isNaN(diff)) {
        return  this.getMinutesSecondsOrHours(diff);
      }
      return diff + ' dia(s) atrás';
    }
  }

  getMinutesSecondsOrHours(diffDaysOfFirstRespnse: string): string {
    if (diffDaysOfFirstRespnse) {
      const timeDiff = diffDaysOfFirstRespnse.split(':');
      if (timeDiff[0] !== '00') {
        return 'Respondido há ' + diffDaysOfFirstRespnse + ' horas(s) atrás';
      }

      if (timeDiff[1] !== '00') {
        return 'Respondido há ' + diffDaysOfFirstRespnse + ' minutos(s) atrás';
      }

      if (timeDiff[1] === '00') {
        return 'Respondido agora';
      }
    }
  }

  getUserLoginToResponse(chatEvaluationComprehensive: ChatEvaluationComprehension) {
    if (this.userLogin.employeeKey && chatEvaluationComprehensive.sender !== this.userLogin.employeeKey) {
      this.chatEvaluationComprehensive.receiver = chatEvaluationComprehensive.sender;
      this.chatEvaluationComprehensive.sender = this.userLogin.employeeKey;
    } else {
      this.chatEvaluationComprehensive.receiver = this.userLogin.employeeKey;
      this.chatEvaluationComprehensive.sender = this.alertInvolved.userKey;
    }
  }

  createNewChatEvaluationComprehensiveness() {
    this.chatEvaluationComprehensive = {};
    this.chatEvaluationComprehensive.alert = {};
    this.chatEvaluationComprehensive.alertInvolved = {};
    this.chatEvaluationComprehensive.alertInvolved.id = this.alertInvolved.id;
    this.chatEvaluationComprehensive.alert.id = this.alert.id;
  }

  respChat(modal: any) {
    let chatEvaluation: ChatEvaluationComprehension = {};
    chatEvaluation = this.chatEvaluationComprehensive;
    this._chatEvaluationChatService.createChatEvaluationComprehension(this.chatEvaluationComprehensive)
      .subscribe((resp) => {
        chatEvaluation = resp;
        if (chatEvaluation.id) {
          const notification = this.createNotificationForChat(chatEvaluation);
          this._emailService.sendEmailUsingPOST(notification)
            .subscribe((res) => {
                this._notify.onSuccess('Notificação enviada com sucesso!');
                this.listChatEvaluation.push(chatEvaluation);
                modal.deny();
            }, (error) => { this._notify.onError(error); });
        }
    }, (error) => { this._notify.onError(error); });
  }

  createNotificationForChat(chatEvaluation: ChatEvaluationComprehension) {
    return this._emailUtil.getNotificationDefault(
      chatEvaluation.sender,
      [chatEvaluation.receiver],
      chatEvaluation.receiver + '- O usuário ' + chatEvaluation.sender + ' respondeu sua mensagem: no alerta '
      + (this.alert.codigo ? this.alert.codigo : this.alert.id),
      chatEvaluation.message
    );
  }

  onEndAlert(modal: any) {
    this.onCreateComprehensiveEvaluation();
    this._evaluationService.createEvaluationComprehension(this.comprehensiveEvaluation)
      .subscribe((resp: ComprehensiveEvaluation) => {
        if (resp.id) {
          this.chatEvaluationComprehensive.evaluationComprehension = {};
          this.chatEvaluationComprehensive.evaluationComprehension.id = resp.id;
          this._chatEvaluationChatService.createChatEvaluationComprehension(this.chatEvaluationComprehensive)
              .subscribe((response) => {
                if (response) {
                  const chatEvaluation = response;
                  const notification = this.createNotificationForEndAlert(chatEvaluation);
                  this._emailService.saveAndSendEmailUsingPOST(notification)
                    .subscribe((res) => {
                      this._notify.onWarning('Notificação enviada com sucesso!');
                      this._notify.onSuccess('Alerta avaliado com sucesso!');
                      modal.deny();
                      this.onReturnToPageListAlert();
                    }, (error) => { this._notify.onError(error); });
                }
            }, (errorChat) => { this._notify.onError(errorChat); });
        }
      }, (error) => { this._notify.onError(error); });
  }

  createNotificationForEndAlert(chatEvaluation: ChatEvaluationComprehension) {
    return this._emailUtil.getNotificationDefault(
      chatEvaluation.sender,
      [chatEvaluation.receiver],
      this.alert.codigo + ' finalizado',
      chatEvaluation.message
    );
  }

  onCreateComprehensiveEvaluation() {
    this.comprehensiveEvaluation.alertInvolved = {};
    this.comprehensiveEvaluation.alertInvolved.id = this.alertInvolved.id;
    this.comprehensiveEvaluation.appraiser = this.chatEvaluationComprehensive.sender;
    this.comprehensiveEvaluation.justify = this.chatEvaluationComprehensive.message;
    this.comprehensiveEvaluation.alertInvolved.statusInvolved = {};

    if (!this.comprehensiveEvaluation.rated) {
      this.comprehensiveEvaluation.alertInvolved.statusInvolved.id = StatusAlertEnum.AGUARDANDO_RESPOSTA;
    }

    if (this.comprehensiveEvaluation.rated) {
      this.comprehensiveEvaluation.alertInvolved.statusInvolved.id = StatusAlertEnum.ALERTA_APROVADO;
    }
  }

  isAppraiser(chat: ChatEvaluationComprehension): boolean {
    return this.userLogin.employeeKey && this.userLogin.employeeKey === chat.receiver && this.userLogin.company === 'PETROBRAS';
  }

  isAppraiserToEvaluation(chat: ChatEvaluationComprehension): boolean {
    return this.userLogin.employeeKey && this.alert.createdBy === this.userLogin.employeeKey
      && this.userLogin.company === 'PETROBRAS';
  }

  isInvolved(chat: ChatEvaluationComprehension, index: number): boolean {
    if (this.listChatEvaluation.length === 1
      && this.userLogin.employeeKey === this.alertInvolved.userKey) {
        return false;
    }

    if (this.listChatEvaluation.length > 0
      && this.userLogin.employeeKey === this.alertInvolved.userKey
      && this.listChatEvaluation.length - 1 === index) {
      if (this.listChatEvaluation[index].receiver === this.alertInvolved.userKey) {
        return true;
      }
    }

    // return this.userLogin.employeeKey === this.alertInvolved.userKey
    // && this.alertInvolved.userKey === chat.sender  && this.userLogin.company !== 'PETROBRAS';
  }

  isReplyChat(index: number) {
    if (this.listChatEvaluation.length === 0
      && this.userLogin.employeeKey === this.alertInvolved.userKey) {
        return false;
    }

    if (this.listChatEvaluation.length > 0
      && this.userLogin.employeeKey === this.alert.createdBy
      && this.listChatEvaluation.length - 1 === index) {
        return true;
    }

    if (this.listChatEvaluation.length > 0
      && this.userLogin.employeeKey === this.alertInvolved.userKey
      && this.listChatEvaluation.length - 1 === index) {
        return true;
    }
  }

  onReturnToPageListAlert() {
    this._router.navigate(['alertas']);
  }

  checkChangeEvaluetion() {
    if (this.comprehensiveEvaluation.rated) {
      this.textRated = 'Alerta Aprovado';
    }
    if (!this.comprehensiveEvaluation.rated) {
      this.textRated = 'Não aprovado';
    }
  }

  getClassEvent(chat: any): string {
    if (this.alertInvolved.userKey === chat.sender) {
      return 'event-involvido';
    }
    return 'event-avaliador';
  }

  getClassTag(chat: any): string {
    if (this.alertInvolved.userKey === chat.sender) {
      return 'ui red tag label involved';
    }
    return 'ui teal tag label avaliador';
  }
  getClassActions(chat: any): string {
    if (this.alertInvolved.userKey === chat.sender
      && this.userLogin.employeeKey === this.alertInvolved.userKey) {
      return 'actions-involved';
    }
    return 'actions-appraiser';
  }
}
