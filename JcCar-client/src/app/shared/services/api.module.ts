import { AlertClassificarionResourceService } from './api/alertClassificationResource.service';
import { TagResourceService } from './api/tagResource.service';
import { AttachmentResourceService } from './api/attachmentResource.service';
import { ScopeEvaluationService } from './api/scopeEvaluationResource.service';
import { EmailResourceService } from './api/emailResource.service';
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { ActionPlanResourceService } from './api/actionPlanResource.service';
import { AlertResourceService } from './api/alertResource.service';
import { ClassAlertResourceService } from './api/classAlertResource.service';
import { ScopeActionPlanService } from './api/scopeActionPlanResource.service';
import { GoldRoleResourceService } from './api/goldRoleResource.service';
import { InvolvedsResourceService } from './api/involvedsResource.service';
import { OriginResourceService } from './api/originResource.service';
import { TemporalityResourceService } from './api/temporalityResource.service';
import { NonComprehensiveChatResourceService } from './api/nonComprehensiveChatResource.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    ActionPlanResourceService,
    AlertResourceService,
    ClassAlertResourceService,
    ScopeActionPlanService,
    ScopeEvaluationService,
    NonComprehensiveChatResourceService,
    GoldRoleResourceService,
    InvolvedsResourceService,
    OriginResourceService,
    TemporalityResourceService,
    AlertClassificarionResourceService,
    EmailResourceService,
    TagResourceService,
    AttachmentResourceService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
