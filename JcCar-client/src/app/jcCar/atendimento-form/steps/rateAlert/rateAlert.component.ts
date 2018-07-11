import { Attachment } from './../../../../shared/services/model/attachment';
import { AttachmentResourceService } from './../../../../shared/services/api/attachmentResource.service';
import { EmailResourceService } from './../../../../shared/services/api/emailResource.service';
import { EmailRequest } from './../../../../shared/model/emailRequest';
import { ArrayUtils } from './../../../../shared/utils/arrayUtils';
import { Observable } from 'rxjs/Observable';
import { SuiModalService, ModalTemplate, TemplateModalConfig } from 'ng2-semantic-ui';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataBundleService } from './../../../../shared/services/data-bundle.service';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Alert } from './../../../../shared/services/model/alert';
import { AlertInvolved } from './../../../../shared/services/model/alertInvolved';
import { User } from './../../../../shared/model/user.model';

import { StatusAlertEnum } from './../../../../shared/model/enumaration/status.alert';
import { environment } from './../../../../../environments/environment.prod';
import { Origin } from '../../../../shared/services';
import { GoldRoleResourceService } from './../../../../shared/services/api/goldRoleResource.service';
import { OriginResourceService } from './../../../../shared/services/api/originResource.service';
import { TemporalityResourceService } from './../../../../shared/services/api/temporalityResource.service';
import { ClassAlertResourceService } from './../../../../shared/services/api/classAlertResource.service';

import { NotifyService } from './../../../../shared/components/notify/notify.service';
import { AlertResourceService } from './../../../../shared/services/api/alertResource.service';
import { UserServiceAPI } from './../../../../shared/services/api/user.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rate-alert',
  templateUrl: './rateAlert.component.html',
  styleUrls: ['./rateAlert.component.css']
})
export class RateAlertComponent implements OnInit, OnDestroy {
  @Input() alert: Alert;
  @Input() alertInvolved: AlertInvolved;
  @Input() formAlert: NgForm;
  @Input() userLogin: User;

  @Output() changedEmbracing = new EventEmitter();

  @ViewChild('modalReportAlert') public modalTemplate: ModalTemplate<null, string, string>;

  user: User = new User();
  isDisabledJustification: Boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notify: NotifyService,
    private _errorHandler: ErrorHandler,
    private _modalService: SuiModalService,
    private _alertResourceService: AlertResourceService,
    private _userService: UserServiceAPI,
    private _attachmentService: AttachmentResourceService,
    private _dataBundleService: DataBundleService
  ) {}

  ngOnInit() {
    // if (this._dataBundleService.getField()) {
    //   // this.alert = this._dataBundleService.getField();
    //   // if (this.alertInvolved && !this.alertInvolved.comprehensiveness) {
    //   //   this.alertInvolved.comprehensiveness = false;
    //   // }
    // }
    this.onLoad();
      setTimeout(() => {
        if (this.alertInvolved && this.alertInvolved.statusInvolved
          && this.alertInvolved.statusInvolved.id !== StatusAlertEnum.ALERTA_EM_AVALIACAO
          || this.alertInvolved.statusInvolved
          && this.alertInvolved.statusInvolved.id !== StatusAlertEnum.PLANO_ACAO_EM_AVALIACAO
          && this.alertInvolved.statusInvolved.id !== StatusAlertEnum.PLANO_ACAO_APROVADO
          && this.alertInvolved.statusInvolved.id !== StatusAlertEnum.PLANO_ACAO_REPROVADO) {
            this.checkChangeComprehensiveness(this.alertInvolved.comprehensiveness);
          } else {
            this.isDisabledJustification = true;
          }
      }, 400);
  }

  ngOnDestroy() {
    this._dataBundleService.cleanAll();
  }

  private onLoad() {
    this.onVerifyUserInvolved();
  }

  onVerifyUserInvolved() {
    this.user = new User();
    this.user.employeeKey = this.alert.createdBy;
  }

  getInfComprehensiveness(): string {
    return environment.INF_COMPRENSIVENESS;
  }

  getLabelComprehensiveness(): string {
    return this.alertInvolved.comprehensiveness === true ? 'Sim' : 'Não';
  }

  checkChangeComprehensiveness(event) {
    this.isDisabledJustification = event;
    if (this.isDisabledJustification) {
      this.alertInvolved.justificationForNotApplicable = '';
    }
    if (this.userLogin && this.userLogin.employeeKey !== this.alertInvolved.userKey) {
      this.isDisabledJustification = true;
    }
    this.changedEmbracing.emit(this.isDisabledJustification);
  }

  onOpenRelAlert() {
    const config = new TemplateModalConfig<null, string, string>(this.modalTemplate);
    config.isClosable = true;
    config.transition = 'fade down';
    this._modalService.open(config);
  }

  onAttachmentsUploadInvolved(event) {}

  downloadAttachment(attachment: Attachment) {
    this._attachmentService.download(attachment.id);
  }

  isNotClassificationYellow(): Boolean {
    return this.alert.alertClassification && this.alert.alertClassification.name !== 'AMARELO';
  }

  isNotInvolved(): Boolean {
    return this.userLogin.employeeKey !== this.alertInvolved.userKey;
  }

  print(printSectionId) {
    window.print();
  }
}
