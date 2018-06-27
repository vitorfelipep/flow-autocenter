import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotifyService } from './shared/components/notify/notify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthTokenService } from './shared/components/security/auth-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public inscription: Subscription;
  public _opened: Boolean = false;

  constructor(
    private notify: NotifyService,
    private vcr: ViewContainerRef,
    private route: ActivatedRoute,
    private authTokenService: AuthTokenService
  ) {
    this.notify.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.inscription = this.route.queryParams.subscribe((queryParams: any) => {
      let simpleToken;

      if (queryParams['token']) {
        simpleToken = queryParams['token'];
      } else {
        simpleToken =
          'CVUsZrgpvXYjYjCeRQK0o9W5 7GMlje3tGLfvIP4NEwggChzju7/QHDJ6OIgmOWwankQ85PIOaXVEPE1Dl6GLOvx9gJt1uZv';
      }
      // this.authTokenService.loadPayload(simpleToken);
    });
  }

  onToggleSidebar(): void {
    this._opened = !this._opened;
  }
}