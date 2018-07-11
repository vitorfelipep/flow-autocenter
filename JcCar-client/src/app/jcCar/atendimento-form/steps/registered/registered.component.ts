import { CALENDAR_PT_BR } from './../../../../shared/constants/app.constants';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { NotifyService } from './../../../../shared/components/notify/notify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataBundleService } from './../../../../shared/services/data-bundle.service';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';

import { TagResourceService } from './../../../../shared/services/api/tagResource.service';
import { AttachmentResourceService } from '../../../../shared/services/api/attachmentResource.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'registered',
    templateUrl: './registered.component.html',
    styleUrls: ['./registered.component.css'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RegisteredComponent implements OnInit, OnDestroy {

    @Input() formAtendimento: NgForm;
    @Input() atendimento: any;

    mecanicoList: Array<string> = [];
    tiposAtendimento: Array<string> = [];
    tiposDeServicoRealizados: Array<string> = [];
    serviceAutoList: Array<string> = [];

    calendar_lang: Object = CALENDAR_PT_BR;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _notify: NotifyService,
        private _errorHandler: ErrorHandler,
        private _modalService: SuiModalService,
        private _attachmentService: AttachmentResourceService,
        private _tagsService: TagResourceService,
        private _dataBundleService: DataBundleService
    ) { }

    ngOnInit() {
      this.onLoad();
    }

    ngOnDestroy() {
        this._dataBundleService.cleanAll();
    }

    private onLoad() {
      this.atendimento.cliente = {};
      this.atendimento.cliente.carros = [];
      this.atendimento.servicosAutomotivos = [];
    }

    onSelectMecanico(event) {
      console.log(event);
    }

    onAddCarCustomer(formServiceCustomer) {

    }

    onEditCar(carSelected: any) {
      console.log(carSelected);
    }

    onRemoveCar(carSelected: any) {
      console.log(carSelected);
    }

    searchService(event) {
      console.log(event);
    }

    getColorOfClassification(classification: any): string {
      if (classification && classification.id === 1) {
        return 'square-yellow';
      }

      if (classification && classification.id === 2) {
        return 'square-red';
      }

      if (classification && classification.id === 3) {
        return 'square-purple';
      }
    }
}
