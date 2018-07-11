import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { URL_USER } from './../../constants/address.constants';

/**
 * ResponseWrapper local
 */
class ResponseWrapper {
    constructor(
        public headers: Headers,
        public json: any,
        public status: number
    ) { }
}

@Injectable()
export class InputUserService {
    constructor(private http: Http) { }

    getUser(chaveBr: string) {
        return this.http.get(`${URL_USER}/${chaveBr}`)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        return new ResponseWrapper(res.headers, res.json(), res.status);
    }
}
