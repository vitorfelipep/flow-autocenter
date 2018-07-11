import { HttpClient } from '@angular/common/http';
import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { URL_USER } from './../constants/address.constants';

@Injectable()
export class UserService {

    user: User;

    constructor(private http: HttpClient) { }

    onGetUserLogged() {
        return this.http.get(URL_USER)
            // .map((res: Response) => res.json())
            .subscribe(data => {
                this.user = data;
            });
    }


    onGetUser(): User {
        return this.user;
    }

}
