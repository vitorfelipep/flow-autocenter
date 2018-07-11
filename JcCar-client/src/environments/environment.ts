// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_AUTH_URL: 'http://localhost:8585/alert-api',
  API_URL_EMPLOYEE: 'http://localhost:8484/dsis-rest/',
  API_URL_SEARCH_ANY_EMPLOYEE: 'http://localhost:8484/dsis-rest/employee/',
  INF_COMPRENSIVENESS: 'O alerta enviado é aplicável ás atribuições ou ambiente de trabalho onde a empresa realiza as suas operações?',
  API_SGEC_URL: 'http://localhost:8080/sgec-rest/',
  API_DSIS_URL: 'http://localhost:8484/dsis-rest/',
  EMAIL_API_URL: 'http://sepapp0224:8484/email-api',
  URL_ATTACHMENT: 'http://localhost:8585/alert-api/attachments'
};
