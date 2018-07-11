import { APIS } from './../../shared/services/api/api';
import { NotificationUtil } from './../../shared/utils/notification.utils';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


import { NotifyService } from '../../shared/components/notify/notify.service';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { SuiModalService, ModalTemplate, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../../shared/components/modal/confim/confirmModal';
import { ErrorHandler } from '../../shared/services/error-handler.service';
import { Temporality } from '../../shared/services/model/temporality';
import { DateUtil, Format } from '../../shared/utils/date-util';
import { ArrayUtils } from '../../shared/utils/arrayUtils';

@Component({
  selector: 'app-atendimento-form',
  templateUrl: './atendimento-form.component.html',
  styleUrls: ['./atendimento-form.component.css']
})
export class AtendimentoFormComponent implements OnInit, OnDestroy {
  @ViewChild('modalCustomerService')
  public modalComment: ModalTemplate<null, string, string>;

  breadcrumb: Array<Object> = [
    {
      icon: 'fa-exclamation-triangle',
      url: '/atendimentos',
      params: '',
      label: 'Lista de Atendimentos'
    },
    {
      icon: 'fa-exclamation-triangle',
      url: '/',
      params: '',
      label: 'Formulário de Atendimento'
    }
  ];

  isSaving: Boolean;
  firstActive: Boolean = true;
  secondActive: Boolean = false;
  thirdActive: Boolean = false;
  fourthActive: Boolean = false;
  fourthDisabled: Boolean = false;
  fifthDisabled: Boolean = false;
  fifthActive: Boolean = false;
  sixthActive: Boolean = false;
  seventhActive: Boolean = false;

  atendimento: any = {};
  buttonNextStepDisable: Boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notify: NotifyService,
    private _errorHandler: ErrorHandler,
    private _modalService: SuiModalService
  ) {
  }

  ngOnInit() {

  }

  onLoad() {
  }

  ngOnDestroy() {
  }

  onSave(fomAtendimento: NgForm) {

  }

  onNextStep(fomAtendimento: NgForm) {

  }

  onCancel() {
    this._router.navigate(['atendimentos']);
  }
}
