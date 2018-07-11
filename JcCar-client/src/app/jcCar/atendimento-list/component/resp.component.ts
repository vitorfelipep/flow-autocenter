import { Component, OnInit, Input } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'resp',
  templateUrl: './resp.component.html',
  styleUrls: ['./resp.component.css']
})
export class RespViewedComponent implements OnInit {

  @Input() alertViewed: any;

  constructor() { }

  ngOnInit() {
  }

  getMessageAboutInvolved(): string {
    if ((this.alertViewed) && (this.alertViewed.viewed) && (this.alertViewed.comprehensiveness)) {
      return  'Aceito';
    }
    if ((this.alertViewed) && (this.alertViewed.viewed) && (this.alertViewed.comprehensiveness == null)) {
      return  'Visualizado';
    }
    if ((this.alertViewed) && (this.alertViewed.viewed) && (!this.alertViewed.comprehensiveness)) {
      return  'Recusado';
    }

    if ((this.alertViewed) && (this.alertViewed.idEnvolvido === null)) {
      return  'Falta envolvido(s)';
    }

    if ((this.alertViewed) && (this.alertViewed.idEnvolvido)
      && (!this.alertViewed.viewed) && (!this.alertViewed.comprehensiveness)) {
      return  'Não visualizado';
    }
    return 'Sem resposta';
  }

  getClassToAlertViewed(): string {
    if ((this.alertViewed) && (this.alertViewed.viewed) && (this.alertViewed.comprehensiveness)) {
      return  'fa-thumbs-up col-is-correct';
    }
    if ((this.alertViewed) && (this.alertViewed.viewed) && (this.alertViewed.comprehensiveness == null)) {
      return  'fa-eye';
    }
    if ((this.alertViewed) && (this.alertViewed.viewed) && (!this.alertViewed.comprehensiveness)) {
      return  'fa-thumbs-down col-not-correct';
    }

    if ((this.alertViewed) && (this.alertViewed.idEnvolvido === null)) {
      return  'fa-exclamation-circle col-not-correct';
    }

    if ((this.alertViewed) && (!this.alertViewed.viewed) && (!this.alertViewed.comprehensiveness)) {
      return  'fa-eye-slash';
    }
    return 'fa-exclamation-circle col-not-correct';
  }

  getClassToAlertForOkOrNotOk(): string {
    if ((this.alertViewed) && (this.alertViewed.viewed) && (this.alertViewed.comprehensiveness)) {
      return  'col-is-correct ';
    }
    if ((this.alertViewed) && (this.alertViewed.viewed) && (this.alertViewed.comprehensiveness == null)) {
      return  'col-not-correct';
    }
    if ((this.alertViewed) && (this.alertViewed.viewed) && (!this.alertViewed.comprehensiveness)) {
      return  'col-not-correct';
    }
    if ((this.alertViewed) && (!this.alertViewed.viewed) && (!this.alertViewed.comprehensiveness)) {
      return  'col-not-correct';
    }
  }

  getToolTypeForAnswer(): string {
    if ((this.alertViewed) && (this.alertViewed.viewed) && (this.alertViewed.comprehensiveness)) {
      return  'Aceito/Abrangente';
    }
    if ((this.alertViewed) && (this.alertViewed.viewed) && (this.alertViewed.comprehensiveness == null)) {
      return  'Visualizado mas não respondido!';
    }
    if ((this.alertViewed) && (this.alertViewed.viewed) && (!this.alertViewed.comprehensiveness)) {
      return  'Recusado/Não Abrangente';
    }

    if ((this.alertViewed) && (this.alertViewed.idEnvolvido === null)) {
      return  'Este alerta não possui empresas envolvidas!';
    }

    if ((this.alertViewed) && (!this.alertViewed.viewed) && (!this.alertViewed.comprehensiveness)) {
      return  'Não visualizado';
    }
    return 'Este alerta não possui envolvidos ainda!';
  }
}
