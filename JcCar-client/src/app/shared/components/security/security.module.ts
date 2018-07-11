import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthTokenService } from './auth-token.service';
import { AuthHttpInterceptor } from './auth-http.interceptor';

export function authHttpServiceFactory(authTokenService: AuthTokenService, http: Http, options: RequestOptions) {
    const config = new AuthConfig({
        globalHeaders: [
            { 'Content-Type': 'application/json' }
        ]
    });

    return new AuthHttpInterceptor(authTokenService, config, http, options);
}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [AuthTokenService, Http, RequestOptions]
        }
    ]
})
export class SecurityModule { }
