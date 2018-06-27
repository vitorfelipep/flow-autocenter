import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { NotifyService } from './../notify/notify.service';
import { URL_OAUTH_TOKEN } from './../../constants/address.constants';


@Injectable()
export class AuthTokenService {
    private jwtPayload: any;

    constructor(private http: Http,
        private jwtHelper: JwtHelper,
        private notify: NotifyService) { }

    /**
     * Este método converte o token do share point em access token e salva no cookie do browser.
     * Se o acess token ja existir no cookie, não é efetuado uma nova solicitação de access token.
     * Limpamos o cookie do browser sempre que fechamos aba, assim evitamos quaisquer problemas de cache.
     * Para limpar o cache, usamos um método javascript no "index.html"
     * @param simpleToken token obtido do sharepoint
     */
    loadPayload(simpleToken: string) {
      const token = localStorage.getItem('token');
      if (token) {
        this.storePayload(token);
      } else {
        this.authenticate(simpleToken).subscribe(
            (res: any) => {
                this.storePayload(res.json().access_token);
            },
            (res: any) => {
                this.notify.onError(res.json().error, res.json().description);
            }
        );
      }
    }

    /**
     * Decodificamos o acces token e o salvamos no cookie.
     * @param token access token enviado pelo spring security
     */
    private storePayload(token: string) {
      this.jwtPayload = this.jwtHelper.decodeToken(token);
      localStorage.setItem('token', token);
    }

    /**
     * Ao obter o token do sharepoint, o mesmo é validado na API, caso esteja correto, o sistema restorna um access token (OAuth2)
     * @param simpleToken token obtido do sharepoint
     */
    authenticate(simpleToken: string): Observable<any> {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Authorization', 'Basic YWxlcnQtY2xpZW50OmFsZXJ0LXNlY3JldA==');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = `client_id=alert-client&username=${simpleToken}&password=${simpleToken}&grant_type=password`;

        return this.http.post(URL_OAUTH_TOKEN, body, { headers }).map((res: any) => {
          console.log(res);
          return res;
        }, (error) => {
          console.log(error);
          return error;
        });
    }

    /**
     * Verifico se existe a permissão decodificada no acces token.
     * @param permission permissão de acesso
     */
    hasPermission(permission: any) {
        return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
    }

    /**
     * Verifica se o acess token está expirado.
     */
    isAccessTokenInvalid() {
        const token = localStorage.getItem('token');
        return !token || this.jwtHelper.isTokenExpired(token);
    }

    /**
     * Requisita ao backend um novo acces token.
     */
    getNewAccessToken(): Promise<void> {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Authorization', 'Basic YWxlcnQtY2xpZW50OmFsZXJ0LXNlY3JldA==');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = 'grant_type=refresh_token';

        return this.http.post(URL_OAUTH_TOKEN, body,
            { headers, withCredentials: true })
            .toPromise()
            .then(response => {
                this.storePayload(response.json().access_token);
                return Promise.resolve(null);
            })
            .catch(response => {
                console.error('Erro ao renovar token.', response);
                return Promise.resolve(null);
            });
    }
}
