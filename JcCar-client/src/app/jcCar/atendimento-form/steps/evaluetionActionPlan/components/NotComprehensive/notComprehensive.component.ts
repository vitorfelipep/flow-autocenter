import {
  NonComprehensiveChatResourceService
} from './../../../../../../shared/services/api/nonComprehensiveChatResource.service';
import { DateUtil, Format } from './../../../../../../shared/utils/date-util';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from './../../../../../../shared/components/notify/notify.service';
import { User } from './../../../../../../shared/model/user.model';
import { AlertInvolved } from './../../../../../../shared/services/model/alertInvolved';
import { Alert } from './../../../../../../shared/services/model/alert';
import { ControlContainer, NgForm } from '@angular/forms';
import {
  Input,
  OnInit,
  OnDestroy,
  ErrorHandler,
  Component,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatEvaluationComprehension } from './../../../../../../shared/services/model/chatEvaluationComprehension';
import { UserServiceAPI } from '../../../../../../shared/services/api/user.service';
import { DataBundleService } from '../../../../../../shared/services/data-bundle.service';
import { ComprehensiveEvaluation } from '../../../../../../shared/services/model/comprehensiveEvaluation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'not-comprehensive',
  templateUrl: './notComprehensive.component.html',
  styleUrls: ['./notComprehensive.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class NotComprehensiveComponent implements OnInit, OnDestroy {

  @Input() alertInvolved: AlertInvolved;
  @Input() alert: Alert;
  @Input() userLogin: User;
  @Input() formAlert: NgForm;

  loading: boolean;
  chatEvaluationComprehensive: ChatEvaluationComprehension = {};
  comprehensiveEvaluation: ComprehensiveEvaluation = {};
  listChatEvaluation: Array<ChatEvaluationComprehension> = [];
  user: User = new User();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notify: NotifyService,
    private _errorHandler: ErrorHandler,
    private _userService: UserServiceAPI,
    private _nonComprehensivenessChatService: NonComprehensiveChatResourceService,
    private _dataBundleService: DataBundleService,
    private errorHandle: ErrorHandler
  ) {}

  ngOnInit() {
    if (this._dataBundleService.getField()) {
      if (this.alertInvolved && !this.alertInvolved.comprehensiveness) {
        this.alertInvolved.comprehensiveness = false;
      }
    }
    setTimeout(() => {
      if (this.alertInvolved.id) {
        this.onLoadAllChats();
      }
    }, 400);
  }

  private onLoadAllChats() {
    if (this.alertInvolved && this.alert) {
      const codeInvolved = this.alertInvolved.id;
      const codeAlert = this.alert.id;
      this._nonComprehensivenessChatService.searchAll(null, null, codeInvolved, codeAlert)
        .subscribe(res => {
        this.listChatEvaluation = res;
        if (!this.listChatEvaluation || this.listChatEvaluation.length === 0) {
          this.listChatEvaluation = [];
          this.involvedToEvaluationComprehensive();
        }
      }, error => { this._notify.onError(error); });
    }
  }

  involvedToEvaluationComprehensive() {
    this.chatEvaluationComprehensive.alertInvolved = {};
    this.chatEvaluationComprehensive.alertInvolved.id = this.alertInvolved.id;
    this.chatEvaluationComprehensive.alert = {};
    this.chatEvaluationComprehensive.alert.id = this.alert.id;
    this.chatEvaluationComprehensive.sender = this.alertInvolved.userKey;
    this.chatEvaluationComprehensive.receiver = this.alert.createdBy;
    this.chatEvaluationComprehensive.message = this.alertInvolved.justificationForNotApplicable ?
    this.alertInvolved.justificationForNotApplicable : 'Teste';
    this._nonComprehensivenessChatService.createChatEvaluationComprehension(this.chatEvaluationComprehensive)
      .subscribe((resp) => {
        this.chatEvaluationComprehensive = resp;
        this.listChatEvaluation.push(this.chatEvaluationComprehensive);
      }, (error) => { this._notify.onError(error); });
  }

  ngOnDestroy() {
    this._dataBundleService.cleanAll();
  }
}
