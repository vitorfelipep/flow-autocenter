import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfimComponent } from './components/modal/confim/confim.component';
import { BreadcrumbModule } from 'hall-components';
import { InputUserComponent } from './components/input-user/input-user.component';
import { InputUserService } from './components/input-user/input-user.service';

@NgModule({
    imports: [
        CommonModule,
        BreadcrumbModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        ConfimComponent,
        InputUserComponent
    ],
    exports: [
        BreadcrumbModule,
        InputUserComponent
    ],
    entryComponents: [
        ConfimComponent
    ],
    providers: [
        InputUserService
    ]
})
export class SharedModule { }
