import { Component, OnInit } from '@angular/core';

import { SuiModal, ComponentModalConfig } from 'ng2-semantic-ui';

import { IConfirmModalContext } from './IConfirmModalContext.interface';
import { ConfirmModal } from './confirmModal';

@Component({
  selector: 'app-confim',
  templateUrl: './confim.component.html',
  styleUrls: ['./confim.component.css']
})
export class ConfimComponent implements OnInit {

  constructor(public modal: SuiModal<IConfirmModalContext, void, void>) { }

  ngOnInit() {
  }

}




