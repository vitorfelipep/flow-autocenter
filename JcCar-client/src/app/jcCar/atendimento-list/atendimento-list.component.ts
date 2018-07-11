import { StatusApplication } from './../../shared/services/model/statusApplication';
import { Origin } from './../../shared/services/model/origin';
import { Alert } from 'selenium-webdriver';
import { AlertProjection } from './../../shared/services/model/alertProjection';
import { DataBundleService } from './../../shared/services/data-bundle.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { NotifyService } from './../../shared/components/notify/notify.service';
import { getPage, getSize, getOrder, getValueFrom, } from '../../shared';
import { DateUtil } from '../../shared/utils/date-util';
import { Format } from '../../shared/utils/date-util';

import { PageAlertProjection } from './../../shared/services/model/pageAlertProjection';
import { AlertResourceService } from './../../shared/services/api/alertResource.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../shared/model/user.model';
import { AlertClass } from '../../shared/services';
import { Atendimento } from '../../shared/services/model/Atendimento';
import { $ } from '../../../../node_modules/protractor';
import { ModalTemplate, TemplateModalConfig, SuiModalService } from '../../../../node_modules/ng2-semantic-ui';
import { ArrayUtils } from '../../shared/utils/arrayUtils';



@Component({
    selector: 'app-atendimento-list',
    templateUrl: './atendimento-list.component.html',
    styleUrls: ['./atendimento-list.component.css']
})
export class AtendimentoListComponent implements OnInit {
    breadcrumb: Array<Object> = [{ icon: 'fa-exclamation-triangle', url: '', params: '', label: 'Lista de Atendimentos' }];
    loading: boolean;

    @ViewChild('modalCustomerService') public modalTemplate: ModalTemplate<null, string, string>;

    sourceCars: Array<Atendimento> = [];
    targetCars: Array<Atendimento> = [];

    selectedService: Atendimento;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _notify: NotifyService,
        private _modalService: SuiModalService,
        private _dataBundleService: DataBundleService,
        private _alertResourceService: AlertResourceService
    ) {}

    ngOnInit() {
      this.loading = true;

      this.sourceCars = [];
      this.targetCars = [];

      const atendimento1: Atendimento = {};
      atendimento1.cliente = {};
      atendimento1.cliente.name = 'Vitor Felipe';
      atendimento1.horaInicio = '07/07/2018 13:22:33';
      atendimento1.horaTerminoEstimativa = '07/07/2018 15:22:33';
      atendimento1.mecanico = 'João da Silva';
      atendimento1.statusAtendimento = 'Em espera';
      atendimento1.tipoAtendimento = 'SERVIÇO';
      atendimento1.tiposDeServicoRealizados = ['FREIO', 'TROCA DE OLÉO', 'TROCA DE PASTILHAS', 'OUTROS'];
      atendimento1.descricaoCasoTipoServicoOutros = 'EM INVESTIGAÇÃO SOBRE PROBLEMA RELATADO PELO CLIENTE. MOTIVO: BARULHO NO MOTOR';
      atendimento1.car = {};
      atendimento1.car.brand = 'Honda';
      atendimento1.car.year = '2014';
      atendimento1.car.color = 'Prata';
      atendimento1.car.board = 'ATT-3653';
      this.sourceCars.push(atendimento1);

      const atendimento5: Atendimento = {};
      atendimento5.cliente = {};
      atendimento5.cliente.name = 'Vitor Felipe';
      atendimento5.horaInicio = '07/07/2018 13:22:33';
      atendimento5.horaTerminoEstimativa = '07/07/2018 15:22:33';
      atendimento5.mecanico = 'João da Silva';
      atendimento5.statusAtendimento = 'Em espera';
      atendimento5.tipoAtendimento = 'ORÇAMENTO';
      atendimento5.tiposDeServicoRealizados = ['SUSPENSÃO', 'FREIO', 'TROCA DE OLÉO'];
      atendimento5.car = {};
      atendimento5.car.brand = 'nissan';
      atendimento5.car.year = '2012';
      atendimento5.car.color = 'Preto';
      atendimento5.car.board = 'ATT-8753';
      this.sourceCars.push(atendimento5);

      const atendimento2: Atendimento = {};
      atendimento2.cliente = {};
      atendimento2.cliente.name = 'Adalberto Torres';
      atendimento2.horaInicio = '07/07/2018 13:22:33';
      atendimento2.horaTerminoEstimativa = '07/07/2018 16:03:33';
      atendimento2.mecanico = 'Carlos Miguel Da Silva';
      atendimento2.statusAtendimento = 'Em espera';
      atendimento2.tipoAtendimento = 'SERVIÇO';
      atendimento2.tiposDeServicoRealizados = ['SUSPENSÃO', 'FREIO'];
      atendimento2.car = {};
      atendimento2.car.brand = 'toyota';
      atendimento2.car.year = '2016';
      atendimento2.car.color = 'Amarelo';
      atendimento2.car.board = 'ATT-3659';
      this.sourceCars.push(atendimento2);

      const atendimento3: Atendimento = {};
      atendimento3.cliente = {};
      atendimento3.cliente.name = 'Danieli de Andrade Dias';
      atendimento3.horaInicio = '07/07/2018 10:22:33';
      atendimento3.horaTerminoEstimativa = '07/07/2018 12:45:33';
      atendimento3.mecanico = 'Raimundo Pinto';
      atendimento3.statusAtendimento = 'Em espera';
      atendimento3.tipoAtendimento = 'ORÇAMENTO';
      atendimento3.tiposDeServicoRealizados = ['SUSPENSÃO', 'FREIO', 'TROCA DE OLÉO', 'HIGIENIZAÇÃO DO AR'];
      atendimento3.car = {};
      atendimento3.car.brand = 'Fiat';
      atendimento3.car.year = '2017';
      atendimento3.car.color = 'Vermelho';
      atendimento3.car.board = 'ATT-3645';
      this.sourceCars.push(atendimento3);

      const atendimento4: Atendimento = {};
      atendimento4.cliente = {};
      atendimento4.cliente.name = 'Sandra de Andrade Dias';
      atendimento4.horaInicio = '07/07/2018 07:30:33';
      atendimento4.horaTerminoEstimativa = '07/07/2018 08:45:33';
      atendimento4.mecanico = 'Felipe Ramos';
      atendimento4.statusAtendimento = 'Em Atendimento';
      atendimento4.tipoAtendimento = 'SERVIÇO';
      atendimento4.tiposDeServicoRealizados = ['SUSPENSÃO', 'FREIO', 'TROCA DE OLÉO'];
      atendimento4.car = {};
      atendimento4.car.brand = 'VW';
      atendimento4.car.year = '2018/2019';
      atendimento4.car.color = 'Preto BK';
      atendimento4.car.board = 'ATT-3653';
      this.targetCars.push(atendimento4);

      const atendimento6: Atendimento = {};
      atendimento6.cliente = {};
      atendimento6.cliente.name = 'Maria Feliz';
      atendimento6.horaInicio = '07/07/2018 07:30:33';
      atendimento6.horaTerminoEstimativa = '07/07/2018 08:45:33';
      atendimento6.mecanico = 'Felipe Ramos';
      atendimento6.statusAtendimento = 'Em espera';
      atendimento6.tipoAtendimento = 'SERVIÇO';
      atendimento6.tiposDeServicoRealizados = ['MOTOR', 'TROCA DA CAIXA DE MARCHA'];
      atendimento6.car = {};
      atendimento6.car.brand = 'Renault';
      atendimento6.car.year = '2018';
      atendimento6.car.color = 'Cinza';
      atendimento6.car.board = 'GRG-2018';
      this.sourceCars.push(atendimento6);


    }

    onLoadAll(event) {
        // this._alertResourceService.searchAlerts(
        //     getValueFrom(event, 'origin.id'),
        //     getValueFrom(event, 'origin'),
        //     getValueFrom(event, 'origin.description'),
        //     getValueFrom(event, 'status.id'),
        //     getValueFrom(event, 'status'),
        //     getValueFrom(event, 'codeAlert'),
        //     getValueFrom(event, 'codeOccurrence'),
        //     getValueFrom(event, 'description'),
        //     getValueFrom(event, 'alertClass.description'),
        //     getValueFrom(event, 'creationDate'),
        //     getValueFrom(event, 'responsedDate'),
        //     getValueFrom(event, 'company'),
        //     getValueFrom(event, 'comprehensiveness'),
        //     getPage(event),
        //     getSize(event),
        //     getOrder(event),
        //     'body'
        // ).subscribe(
        //     (res: PageAlertProjection) => {
        //         this.pageAlert = res;
        //         this.onFomartDateToPtBr();
        //         this.getListOfCreationDateForFilter();
        //         this.loading = false;
        //     },
        //     (res: HttpErrorResponse) => {
        //         console.log(res);
        //         this._notify.onError(res.error.error + '. Code: ' + res.status);
        //     }
        // );
        this.loading = false;
    }

    onAddCustomeService() {
      // const fields = {
      //   userLogin: this.userLogin
      // };
      // this._dataBundleService.save(fields);
      this._router.navigate(['atendimentos/form']);
    }


    onSourceSelect(event) {
      // this._notify.onInfo('Deseja iniciar atendimento do Sr.' + event.items[0].cliente);
      this.selectedService = event.items[0];
      const config = new TemplateModalConfig<null, string, string>(this.modalTemplate);
      config.isClosable = false;
      config.transition = 'scale';
      this._modalService.open(config);
    }

    onAttendCustomeService(modal: any) {
      // if (ArrayUtils.isEmptyList(this.targetCars)) {
        this.selectedService.statusAtendimento = 'Em Atendimento';
        this.targetCars.push(this.selectedService);
      // }
      this.sourceCars = this.sourceCars.filter(c => c !== this.selectedService);
      modal.deny();
    }

    onSetStyleImprov(atendimento: Atendimento): string {
      if (atendimento.car && atendimento.car.brand === 'toyota' || atendimento.car.brand === 'nissan') {
        return 'img-improv';
      }
    }

    onItemDisabled(atendimento: Atendimento): any {
      const index = this.sourceCars.findIndex(a => a === atendimento);
      if (index !== 0) {
        return { 'disabled': 'true' };
      }
    }
}
