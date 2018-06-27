import { Component, OnInit } from '@angular/core';
import { NotifyService } from './../shared/components/notify/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private notify: NotifyService) { }

  ngOnInit() {
  }

  onSuccess() {
    this.notify.onSuccess();
  }

  onError() {
    this.notify.onError();
  }

  onWarning() {
    this.notify.onWarning();
  }

  onInfo() {
    this.notify.onInfo();
  }

}
