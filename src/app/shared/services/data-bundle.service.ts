import { Injectable } from '@angular/core';

@Injectable()
export class DataBundleService {
    private field: string;

    constructor() {
        this.field = 'field';
    }

    save(data: any) {
        localStorage.setItem(this.field, JSON.stringify(data));
    }

    getField() {
        const data = localStorage.getItem(this.field);
        return JSON.parse(data);
    }

    cleanAll() {
        localStorage.clear();
    }

    clearField(key: string) {
        localStorage.removeItem(key);
    }
}
