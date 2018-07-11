import { Router } from '@angular/router';
import { OnInit,  Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-403',
  templateUrl: './403.component.html',
  styleUrls: ['./403.component.css']
})
export class NotAuthorizesComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
}
