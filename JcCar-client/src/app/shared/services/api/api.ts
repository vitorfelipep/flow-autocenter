export * from './actionPlanResource.service';
import { ActionPlanResourceService } from './actionPlanResource.service';
export * from './alertResource.service';
import { AlertResourceService } from './alertResource.service';
export * from './classAlertResource.service';
import { AttachmentResourceService } from './attachmentResource.service';
export * from './classAlertResource.service';
import { ClassAlertResourceService } from './classAlertResource.service';
export * from './goldRoleResource.service';
import { GoldRoleResourceService } from './goldRoleResource.service';
export * from './involvedsResource.service';
import { InvolvedsResourceService } from './involvedsResource.service';
export * from './nonComprehensiveChatResource.service';
import { NonComprehensiveChatResourceService } from './nonComprehensiveChatResource.service';
export * from './alertClassificationResource.service';
import { AlertClassificarionResourceService } from './alertClassificationResource.service';
export * from './originResource.service';
import { OriginResourceService } from './originResource.service';
export * from './scopeActionPlanResource.service';
import { ScopeActionPlanService } from './scopeActionPlanResource.service';
export * from './scopeEvaluationResource.service';
import { ScopeEvaluationService } from './scopeEvaluationResource.service';
export * from './temporalityResource.service';
import { TemporalityResourceService } from './temporalityResource.service';
export * from './emailResource.service';
import { TagResourceService } from './tagResource.service';
export * from './temporalityResource.service';
import { EmailResourceService } from './emailResource.service';
export const APIS = [ActionPlanResourceService, AlertResourceService, ClassAlertResourceService,
  ScopeActionPlanService, ScopeEvaluationService, GoldRoleResourceService, InvolvedsResourceService,
  NonComprehensiveChatResourceService, OriginResourceService, TemporalityResourceService, EmailResourceService,
  AttachmentResourceService, TagResourceService, AlertClassificarionResourceService];
