import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelper } from 'angular2-jwt';
import { AuthTokenService } from './shared/components/security/auth-token.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './header/menu/menu.component';
import { MenuSidebarComponent } from './header/menu-sidebar/menu-sidebar.component';
import { NotificationComponent } from './header/notification/notification.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { SuiModule, SuiSidebarModule } from 'ng2-semantic-ui';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { LoaderModule } from 'hall-components';
import { AppRoutingModule } from './app-routing.module';
import { CustomOption } from './shared/components/notify/notify-custom-option';
import { ErrorHandler } from './shared/services/error-handler.service';
import { NotifyService } from './shared/components/notify/notify.service';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ApiModule } from './shared/services/api.module';
import { Configuration, ConfigurationParameters, BASE_PATH } from './shared/services/index';
import { DataBundleService } from './shared/services/data-bundle.service';
import { HeaderComponent } from './header/header.component';

export function apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {
        // 'basePath': environment.API_AUTH_URL
    };
    return new Configuration(params);
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotificationComponent,
        MenuComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        LoaderModule,
        SuiModule,
        ToastModule.forRoot(),
        AppRoutingModule,
        ApiModule.forRoot(apiConfigFactory)
    ],
    providers: [
        { provide: BASE_PATH, useValue: environment.API_AUTH_URL },
        NotifyService,
        AuthTokenService,
        JwtHelper,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: ToastOptions, useClass: CustomOption },
        ErrorHandler,
        DataBundleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
