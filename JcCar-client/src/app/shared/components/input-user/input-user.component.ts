import { User } from './../../model/user.model';
import { Response } from '@angular/http';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

import { InputUserService } from './input-user.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'input-user',
    templateUrl: './input-user.component.html',
    styleUrls: ['./input-user.component.css']
})
export class InputUserComponent implements OnInit, OnChanges {

    @Input() chaveUser: string;
    @Output() userChanges: EventEmitter<User> = new EventEmitter();

    user: User;

    constructor(private userService: InputUserService) {
        this.chaveUser = '';
        this.userChanges = new EventEmitter<User>();
    }

    ngOnInit() {
        if (this.user && this.user.employeeId) {
            this.getUser(this.user.employeeKey);
        }
        this.user = new User();
    }

    // @Input() set clean(doClean: boolean) {
    //     this.user = (doClean) ? new User() : this.user;
    // }

    ngOnChanges() {
        if (this.chaveUser) {
            this.getUser(this.chaveUser);
        }
    }

    getUser(chaveBr) {
        this.user = new User();
        if (chaveBr) {
            this.userService.getUser(chaveBr).subscribe(
                (res: any) => {
                    this.user = res.json;
                    this.userChanges.emit(this.user);
                },
                (res: any) => res
            );
        }
    }

    getFotoUrl(empresa, identificador): string {
        if (!identificador) {
            return 'http://localizadorpessoas.petrobras.com.br/lope/images/placeholder.jpg';
        }
        if (empresa && empresa === 'PETROBRAS') {
            return this.getFotoUrlPetrobras(identificador);
        }
        return this.getFotoUrlTerceiro(identificador);
    }

    private getFotoUrlPetrobras(identificador): string {
        return 'http://apl.ti.petrobras.com.br/fotos/' + this.zeroFill(identificador, 8) + '.jpg';
    }

    private getFotoUrlTerceiro(identificador): string {
        return 'http://spme.petrobras.com.br/fotos/' + this.zeroFill(identificador, 8) + '.jpg';
    }

    // TODO: jogar para um js utils
    private zeroFill(number, width): any {
        width -= number.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + '';
    }
}
