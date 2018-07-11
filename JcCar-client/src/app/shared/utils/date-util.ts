import * as moment from 'moment';

export class DateUtil {
  public static formatPtBr(data: any, format: Format): any {
    let dataFormat: any;
    dataFormat = moment(
      moment(data, [format, moment.ISO_8601])
        .locale('pt-br')
        .locale('en-us')
        .format()
    );
    dataFormat = moment(dataFormat).format(format);
    if (dataFormat === 'Invalid date') {
      dataFormat = data;
    }
    return dataFormat;
  }

  public static formatDateStringToDate(data: any, format: Format): any {
    let dataFormat: any;
    dataFormat = moment(data, format).format();
    if (dataFormat === 'Invalid date') {
      dataFormat = data;
    }
    return dataFormat;
  }

  public static formatEnUs(data: any, format: Format): string {
    let dataFormat: any;
    dataFormat = moment(data, format)
      .locale('pt-br')
      .locale('en-us')
      .format();
    return dataFormat;
  }

  public static formatLocalDateTime(date, format: Format): any {
    let dataFormat: any;
    dataFormat = moment(date).format(format);
    if (dataFormat === 'Invalid date') {
      dataFormat = date;
    }
    return dataFormat;
  }

  public static format(data) {
    const converted = moment(data).format('DD/MM/YYYY');
    return moment(converted, 'DD/MM/YYYY').toDate();
  }

  public static formatDateTime(data) {
    const converted = moment(data).format('DD/MM/YYYY HH:mm:ss');
    return moment(converted, 'DD/MM/YYYY HH:mm:ss').toDate();
  }

  public static diffDay(date): any {
    const dateOne = moment(date, 'DD/MM/YYYY HH:mm:ss');
    const dateNow = moment(moment(), 'DD/MM/YYYY HH:mm:ss');
    const diffDays = dateNow.diff(dateOne, 'days');
    if (diffDays > 0) {
      return diffDays;
    }

    if (diffDays <= 0 ) {
      const duration = moment.duration(dateNow.diff(dateOne));
      return duration.get('hours').toString().padStart(2, '0') + ':' + duration
        .get('minutes').toString().padStart(2, '0');
    }
  }
}

export enum Format {
  dataHora = 'DD/MM/YYYY HH:mm',
  data = 'DD/MM/YYYY',
  dateUS = 'YYYY-MM-DD',
  localDateTime = 'YYYY-MM-DD HH:mm:ss'
}
