import { NotificationUtil } from './../shared/utils/notification.utils';
import { UserServiceAPI } from './../shared/services/api/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SuiModule } from 'ng2-semantic-ui';
import { DataTableModule, FieldsetModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { PickListModule } from 'primeng/picklist';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { GalleriaModule } from 'primeng/galleria';

import { SharedModule } from './../shared/shared.module';
import { AtedimentoRoutingModule } from './atendimento-routing.module';
import { AtendimentoListComponent } from './atendimento-list/atendimento-list.component';
import { AtendimentoFormComponent } from './atendimento-form/atendimento-form.component';
import { RespViewedComponent } from './atendimento-list/component/resp.component';
import { RegisteredComponent } from './atendimento-form/steps/registered/registered.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SuiModule,
        DataTableModule,
        DataViewModule,
        DropdownModule,
        EditorModule,
        FileUploadModule,
        AutoCompleteModule,
        GalleriaModule,
        CalendarModule,
        FieldsetModule,
        SharedModule,
        PickListModule,
        AtedimentoRoutingModule,
        HttpClientModule
    ],
    declarations: [
        AtendimentoListComponent,
        AtendimentoFormComponent,
        RegisteredComponent,
        RespViewedComponent
    ],
    providers: [
        UserServiceAPI,
        NotificationUtil
    ]
})
export class AtedimentoModule { }
