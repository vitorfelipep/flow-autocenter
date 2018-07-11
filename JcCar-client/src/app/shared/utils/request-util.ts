import { URLSearchParams, BaseRequestOptions } from '@angular/http';

/**
 * Adiciona a paginação e parametros da consulta no cabeçalho
 * @param req event from datatable primeng
 */
export const createRequestOption = (req?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const params: URLSearchParams = new URLSearchParams();
        if (req.first && req.rows) {
            const page: string = String(req.first / req.rows);
            params.set('page', page);
            params.set('size', req.rows);
        }
        if (req.multiSortMeta) {
            const orders: any = [];
            req.multiSortMeta.forEach(element => {
                const order = element.order === 1 ? 'ASC' : 'DESC';
                orders.push([element.field + ',' + order]);
            });
            params.paramsMap.set('sort', orders);
        }
        Object.keys(req.filters).map((value) => {
            params.set(value, req.filters[value].value);
            // Se precisar que o tipo de filtragem seja dinamico para cada atributo
            // params.set(`${value}MatchMode`, req.filters[value].matchMode);
        });


        options.params = params;
    }
    return options;
};

/**
 * Retorna a pagina solicitada pela tabela do primeng
 * @param req event from datatable primeng
 */
export const getPage = (req: any): string => {
    return String(req.first / req.rows);
};

/**
 * Retorna o tamanho de linhas solicitado pelo primeng
 * @param req event from datatable primeng
 */
export const getSize = (req: any): string => {
    return req.rows;
};

/**
 * Retorna a ordenação da tabela do primeng
 * @param req event from datatable primeng
 */
export const getOrder = (req: any): any[] => {
    const orders: any = [];
    if (req.multiSortMeta) {
        req.multiSortMeta.forEach(element => {
            const order = element.order === 1 ? 'ASC' : 'DESC';
            orders.push([element.field + ',' + order]);
        });
    }
    return orders;
};

/**
 *
 * @param req
 * @param param
 */
export const getValueFrom = (req: any, param: string): any => {
    let retorno: string;
    Object.keys(req.filters).map((value) => {
        if (value === param) {
            retorno = req.filters[value].value;
        }
    });
    return retorno;
};

