import { User } from './../../../shared/model/user.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ModalTemplate, TemplateModalConfig, SuiModalService } from 'ng2-semantic-ui';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input('user') user: User = new User();
    userLinked: User = new User();
    userslist: User[] = [];

    constructor(
        private modalService: SuiModalService
    ) { }

    ngOnInit() {
        // this.user = this.userService.onGetUser();
    }


    // getFotoUrl(user: User): string {
    //     if (!user.employeeId) {
    //         return 'http://localizadorpessoas.petrobras.com.br/lope/images/placeholder.jpg';
    //     }
    //     if (user.company && user.company === 'PETROBRAS') {
    //         return this.getFotoUrlPetrobras(user.employeeId);
    //     }
    //     return this.getFotoUrlTerceiro(user.employeeId);
    // }

    // private getFotoUrlPetrobras(identificador): string {
    //     return 'http://apl.ti.petrobras.com.br/fotos/' + this.zeroFill(identificador, 8) + '.jpg';
    // }

    // private getFotoUrlTerceiro(identificador): string {
    //     return 'http://spme.petrobras.com.br/fotos/' + this.zeroFill(identificador, 8) + '.jpg';
    // }

    // // TODO: jogar para um js utils
    // private zeroFill(number, width): any {
    //     width -= number.toString().length;
    //     if (width > 0) {
    //         return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    //     }
    //     return number + '';
    // }

}
