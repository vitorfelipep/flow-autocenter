import { Observable } from 'rxjs/Observable';
import { Http, ResponseContentType } from '@angular/http';
import { OnInit, Injectable } from '@angular/core';
import { Attachment } from './../services/model/attachment';
import { EmailRequest } from './../model/emailRequest';
import { Alert } from '../services';

@Injectable()
export class NotificationUtil {

  imageLogo: any;
  imageSms: any;
  imagePortal: any;

  constructor(private http: Http) {
    this.getImageFromService('../../../assets/img/email/petro_logo.png',
       '../../../assets/img/email/sms_logo.gif', '../../../assets/img/email/portal_ctps.gif');
  }


  getNotificationDefault(from: string, to: Array<string>, title: string, message: string): EmailRequest {
    const notification: EmailRequest = {};
    notification.from = from;
    notification.to = to;
    notification.subject = title;
    notification.imagens = [
      {
        contentType: 'image/png',
        file: 'base64',
        name: 'logoPetrobras'
      },
      {
        contentType: 'image/gif',
        file: 'base64',
        name: 'sms_logo'
      },
      {
        contentType: 'image/gif',
        file: 'base64',
        name: 'portal_ctps'
      }
    ];

    notification.imagens[0].file = this.imageLogo[1];
    notification.imagens[1].file = this.imageSms[1];
    notification.imagens[2].file = this.imagePortal[1];
    notification.message = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Alert - Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
        style="border-collapse: collapse; border: 1px solid #cccccc;">
        <tr>
          <td align="center" bgcolor="#378863" style="padding: 4px 0 4px 0;">
            <img src="../../../assets/img/email/petro_logo.png"
            alt="PETROBRAS" width="600" height="150" style="display: block;" />
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="260" valign="top" style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;
              padding: 23px 0px 0px 5px;">
              <b>${notification.subject }</b>
              </td>
            </tr>
            <tr>
              <td style="padding: 25px 5px 30px 5px; text-align: justify; color: #153643;
              font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
              ${ message }
              </td>
            </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 30px 30px 30px;background-color: #982c2f;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="75%" style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
              &reg; SMS, Sistema de Alertas 2018<br/>
              <font color="#ffffff">Você recebeu este E-mail de forma automática, por favor não o responda!</font>
              </td>
              <td>
              <td align="right">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                  <td>
                    <a href="http://portalctps/ssms">
                    <img src="../../../assets/img/email/sms_logo.gif" alt="SSMS" width="38"
                      height="38" style="display: block;" border="0" />
                    </a>
                  </td>
                  <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                  <td>
                    <a href="http://portalctps/Lists/DSPortalBase/Home.aspx">
                    <img src="../../../assets/img/email/portal_ctps.gif" alt="Portal CTPS" width="38"
                      height="38" style="display: block;" border="0" />
                    </a>
                  </td>
                  </tr>
                </table>
                </td>
              </td>
            </tr>
            </table>
          </td>
        </tr>
      </table>
      </body>
    </html>`;
    notification.applicationCode = '2';
    return notification;
  }

  createEmail(from: string, to: Array<string>, title: string, message: string, alert: Alert): EmailRequest {
    const emailRequest: EmailRequest = {};
    emailRequest.from = from;
    emailRequest.to = to;
    emailRequest.subject = title;
    emailRequest.imagens = [
      {
        contentType: 'image/png',
        file: 'base64',
        name: 'logoPetrobras'
      },
      {
        contentType: 'image/gif',
        file: 'base64',
        name: 'sms_logo'
      },
      {
        contentType: 'image/gif',
        file: 'base64',
        name: 'portal_ctps'
      }
    ];

    emailRequest.imagens[0].file = this.imageLogo[1];
    emailRequest.imagens[1].file = this.imageSms[1];
    emailRequest.imagens[2].file = this.imagePortal[1];

    emailRequest.message = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Alert - Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
        style="border-collapse: collapse; border: 1px solid #cccccc;">
        <tr>
          <td align="center" bgcolor="#378863" style="padding: 4px 0 4px 0;">
            <img src='cid:logoPetrobras'
            alt="PETROBRAS" width="600" height="150" style="display: block;" />
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="260" valign="top" style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;
              padding: 23px 0px 0px 5px;">
              <b>${ emailRequest.subject } - Alerta: ${ alert.id }</b>
              </td>
            </tr>
            <tr>
              <td style="padding: 25px 5px 30px 5px; text-align: justify; color: #153643;
              font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                ${ alert.description }
              </td>
            </tr>
            <tr>
              <td style="padding: 25px 5px 30px 5px; text-align: justify; color: #153643; font-family: Arial,
              sans-serif; font-size: 16px; line-height: 20px;">
                <b>Causa básica:</b> ${ alert.basicCause }</br>
                <b>Classe:</b> ${ alert.alertClass !== null ? alert.alertClass.description : 'N/A' }
              </td>
            </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 30px 30px 30px;background-color: #982c2f;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="75%" style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
              &reg; SMS, Sistema de Alertas 2018<br/>
              <font color="#ffffff">Você recebeu este E-mail de forma automática, por favor não o responda!</font>
              </td>
              <td>
              <td align="right">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                  <td>
                    <a href="http://portalctps/ssms">
                    <img src="cid:sms_logo" alt="SSMS" width="38"
                      height="38" style="display: block;" border="0" />
                    </a>
                  </td>
                  <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
                  <td>
                    <a href="http://portalctps/Lists/DSPortalBase/Home.aspx">
                    <img src="cid:portal_ctps" alt="Portal CTPS" width="38"
                      height="38" style="display: block;" border="0" />
                    </a>
                  </td>
                  </tr>
                </table>
                </td>
              </td>
            </tr>
            </table>
          </td>
        </tr>
      </table>
      </body>
    </html>`;
    if (alert.attachments) {
      emailRequest.attachments = [];
      alert.attachments.forEach(a => {
        const attachment: Attachment = {};
        attachment.file = a.file;
        attachment.id = a.id;
        attachment.name = a.name;
        attachment.size = a.size;
        attachment.type = a.type;
        emailRequest.attachments.push(attachment);
      });
    }
    emailRequest.applicationCode = '2';
    return emailRequest;
  }

  getImageFromService(url: string, url2: string, url3: string) {
    this.getImage(url).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });

    this.getImage(url2).subscribe(data => {
      this.createImageSmsFromBlob(data);
    }, error => {
      console.log(error);
    });

    this.getImage(url3).subscribe(data => {
      this.createImagePortalFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageLogo = reader.result.split('base64,');
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  createImageSmsFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageSms = reader.result.split('base64,');
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  createImagePortalFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagePortal = reader.result.split('base64,');
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

   getImage(imageUrl: string): Observable<File> {
    return this.http
        .get(imageUrl, { responseType: ResponseContentType.Blob }).map(
          (res: any) => res.blob());
  }

  public getImageLogo(): string {
    return this.imageLogo;
  }
  public getImageSms(): string {
    return this.imageSms;
  }
  public getImagePortal(): string {
    return this.imagePortal;
  }
}
