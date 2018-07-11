import { Component, OnInit } from '@angular/core';
import { NotifyService } from './../shared/components/notify/notify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _notify: NotifyService
  ) { }

  ngOnInit() {
  }

  onSuccess() {
    this._notify.onSuccess();
  }

  onError() {
    this._notify.onError();
  }

  onWarning() {
    this._notify.onWarning();
  }

  onInfo() {
    this._notify.onInfo();
  }

  onClickNewCustomerService() {
    this._router.navigate(['atendimentos']);
  }

}
