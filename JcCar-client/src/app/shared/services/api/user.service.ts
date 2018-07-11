import { URL_USER_AUTO_COMPLETE, URL_USER } from './../../constants/address.constants';
import { HttpClient } from '@angular/common/http';
import { User } from './../../model/user.model';
import { Injectable } from '@angular/core';
import { ResponseWrapper } from '../../model/response-wrapper.model';



@Injectable()
export class UserServiceAPI {

    user: User;

    constructor(private http: HttpClient) { }

    onGetUserLogged() {
        return this.http.get(URL_USER)
            .subscribe(data => {
                this.user = data;
            });
    }

    findUserByKey(chaveBr: string) {
        return this.http.get(`${URL_USER_AUTO_COMPLETE}/${chaveBr}`)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        return new ResponseWrapper(res.headers, res, res.status);
    }

    onGetUser(): User {
        return this.user;
    }
}
