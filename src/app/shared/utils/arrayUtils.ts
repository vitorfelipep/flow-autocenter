export class ArrayUtils {

    static isNotEmptyList(obj: Array<any>): boolean {
        return Array.isArray(obj) && obj.length > 0;
    }

    static isEmptyList(obj: Array<any>): boolean {
        return Array.isArray(obj) && obj.length === 0 || obj === undefined;
    }
}
