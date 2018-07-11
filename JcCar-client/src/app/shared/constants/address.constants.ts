import { environment } from './../../../environments/environment';

export const URL_APPLICATION: string = environment.API_AUTH_URL + 'alerts';
export const URL_USER: string = environment.API_URL_EMPLOYEE + 'employee';
export const URL_USER_AUTO_COMPLETE: string = environment.API_URL_SEARCH_ANY_EMPLOYEE + 'byKey';

export const URL_OAUTH_TOKEN: string = environment.API_AUTH_URL + '/oauth/token';
export const URL_EMAIL_API: string = environment.EMAIL_API_URL;
export const URL_ATTACHMENT: string = environment.URL_ATTACHMENT;



