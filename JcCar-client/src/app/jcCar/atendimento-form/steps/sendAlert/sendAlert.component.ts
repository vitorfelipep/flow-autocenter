import { ArrayUtils } from './../../../../shared/utils/arrayUtils';
import { Observable } from 'rxjs/Observable';
import { SuiModalService, ModalTemplate, TemplateModalConfig } from 'ng2-semantic-ui';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataBundleService } from './../../../../shared/services/data-bundle.service';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';

import { Alert } from './../../../../shared/services/model/alert';
import { AlertInvolved } from './../../../../shared/services/model/alertInvolved';
import { EmailRequest } from './../../../../shared/model/emailRequest';
import { User } from './../../../../shared/model/user.model';

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
  selector: 'send-alert',
  templateUrl: './sendAlert.component.html',
  styleUrls: ['./sendAlert.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class SendAlertComponent implements OnInit, OnDestroy {

  @Input() alert: Alert;
  @Input() formAlert: NgForm;
  @Input() emailRequest: EmailRequest;

  @ViewChild('modalAttachment') public modalTemplate: ModalTemplate<null, string, string>;

  alertInvolved: AlertInvolved = {};
  user: User = new User();

  filteredUseMultiple: any[];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notify: NotifyService,
    private _errorHandler: ErrorHandler,
    private _modalService: SuiModalService,
    private _alertResourceService: AlertResourceService,
    private _userService: UserServiceAPI,
    private _dataBundleService: DataBundleService
  ) {}

  ngOnInit() {
    // if (this._dataBundleService.getField()) {
    //   this.alert = this._dataBundleService.getField();
    // }
    setTimeout(() => {
      this.creatNotificationDefault();
    }, 400);
    this.onLoad();
  }

  ngOnDestroy() {
    this._dataBundleService.cleanAll();
  }

  private onLoad() {
    if (this.alert.alertInvolveds && this.alert.alertInvolveds.length > 0 && this.alert.status > 2) {
      this._router.navigate(['alertas']);
    }

    if (this.alert.alertInvolveds && this.alert.alertInvolveds.length > 0 && this.alert.status === 2) {
      this.alert.alertInvolveds.forEach(involved => this.getFilteredMultiple(involved));
    }
  }

  creatNotificationDefault() {
    if (this.alert && this.alert.id) {
      this.emailRequest.subject = this.alert.title;
      this.emailRequest.message = this.alert.description + ' - Alerta ' + this.alert.id;
    }

    if (this.alert && this.alert.id && this.alert.alertInvolveds) {
      this.emailRequest.to = [];
      this.alert.alertInvolveds.forEach(i => {
        this.involvedsListAutoComplete(i.userKey);
      });
    }

    if (this.alert && !this.alert.id) {
      // Chamada recursiva para dar bind no alerta
      setTimeout(() => {
        this.creatNotificationDefault();
      }, 400);
    }
  }

  involvedsListAutoComplete(userKey) {
    this._userService.findUserByKey(userKey).subscribe(
      resp => {
        this.filteredUseMultiple = this.filterUser(userKey, resp.json);
        this.filteredUseMultiple.forEach(i => {
          this.emailRequest.to.push(i);
        });
      },
      error => {
        this._notify.onError(error);
      }
    );
  }

  filterinvolvedsMultiple(event) {
    const query = event.query;
    this._userService.findUserByKey(query).subscribe(
      resp => {
        if (resp.json && resp.json.length > 0) {
          this.filteredUseMultiple = this.filterUser(query, resp.json);
        }
        // else if (this.isEmail(query)) {
        //   const email = { employeeKey: query };
        //   this.filteredUseMultiple.push(email);
        // }
        // this.filteredUseMultiple = [...this.filteredUseMultiple];
      },
      error => {
        this._notify.onError(error);
        console.log(error);
      }
    );
  }

  // Verificar possibilidade de adicionar usuários externos
  // isEmail(email): boolean {
  //   const exclude = /\[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
  //   const check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   const checkend = /\.[a-zA-Z]{2,3}$/;
  //   if (((email.search(exclude) !== -1) || (email.search(check)) === -1)
  //     || (email.search(checkend) === -1)) {
  //     return false;
  //   } else {return true; }
  // }

  getFilteredMultiple(involved: AlertInvolved) {
    const query = involved.userKey;
    this._userService.findUserByKey(query).subscribe(
      resp => {
        this.filteredUseMultiple = this.filterUser(query, resp.json);
      },
      error => {
        this._notify.onError(error);
        console.log(error);
      }
    );
  }

  // in a real application, make a request to a remote url with the query and return filtered results,
  // for demo we filter at client side
  filterUser(query, users: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.employeeKey.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(user);
      }
    }
    return filtered;
  }

  onSelectTo(event: any) {
    this.alertInvolved = {};
    this.alertInvolved.userKey = event.employeeKey;
    this.alertInvolved.company = event.company;
    if (!this.alert.alertInvolveds) {
      this.alert.alertInvolveds = [];
      this.alert.alertInvolveds.push(this.alertInvolved);
    } else {
      let existInvolved = false;
      this.alert.alertInvolveds.forEach(i => {
        if (i.userKey === event.employeeKey) {
          existInvolved = true;
          this._notify.onInfo('Já existe um envolvido/empresa atrelado a este alerta!');
        }
      });

      if (!existInvolved) {
        this.alert.alertInvolveds.push(this.alertInvolved);
      }

      if (existInvolved) {
        this.emailRequest.to = this.emailRequest.to.filter(
          i => i !== event.employeeKey
        );
      }
    }
  }

  onUnselectEvent(event: any) {
    if (ArrayUtils.isNotEmptyList(this.alert.alertInvolveds)) {
      this.alert.alertInvolveds.forEach((involved, i) => {
        if (!involved.id) {
          this.alert.alertInvolveds = this.alert.alertInvolveds.filter(
            inv => inv.userKey !== event.employeeKey
          );
        }
      });

      this.emailRequest.to = this.emailRequest.to.filter(
        i => i !== event.employeeKey
      );
    }
  }

  onGettUsuarioToUpdate() {
    this.user = new User();
    this.user.employeeKey = this.alert.createdBy;
  }

  setUserOnAlert() {
    this.alert.createdBy = this.user.employeeKey
      ? this.user.employeeKey
      : this.user.employeeId.toString();
    this.alert.mainManagement = this.user.department;
  }

  onOpenTableAttachment() {
    const config = new TemplateModalConfig<null, string, string>(this.modalTemplate);
    config.isClosable = true;
    config.transition = 'fade down';
    this._modalService.open(config);
  }
}
