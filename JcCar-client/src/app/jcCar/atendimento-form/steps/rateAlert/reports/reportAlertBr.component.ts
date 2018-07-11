import { AlertInvolved } from './../../../../../shared/services/model/alertInvolved';
import { Alert } from './../../../../../shared/services/model/alert';

import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-report-alert',
  templateUrl: './reportAlertBr.component.html',
  styleUrls: ['./reportAlertBr.component.css']
})
export class ReportAlertBrComponent implements OnInit, OnDestroy {

  @Input() alert: Alert;
  @Input() alertInvolved: AlertInvolved;
  @Input() formAlert: NgForm;

  images: any[];

  constructor() {}

  ngOnInit() {
    this.images = [];
    this.images.push({ source: '../../../../../../assets/img/petro_logo.png',  alt: 'Foto do registro', title: 'Acidente de trabalho' });
    this.images.push({ source: '../../../../../../assets/img/acidente.jpg',  alt: 'Foto do acidente', title: 'BlowUp' });
    this.images.push({ source: '../../../../../../assets/img/plataforma-tombada.jpg',  alt: 'Foto do acidente', title: '??' });
    this.images.push({ source: '../../../../../../assets/img/strange.jpg',  alt: 'Foto do acidente', title: '??' });
  }

  ngOnDestroy() {}

  isAlertDefinitive(): boolean {
    return this.alert && this.alert.temporality && this.alert.temporality.id === 2;
  }
}
