import * as CryptoJS from 'crypto-js';

const cypherKey = process.env.NEXT_PUBLIC_CYPHER_JS_KEY || ''

export const encrypt = (data: any, key?: string): string => {
    key = key ? key : cypherKey;
    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), key);
    return cipherText.toString();
}

export const decrypt = (cipherText: string, key?: string): any => {
    key = key ? key : cypherKey;
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    return parseItem(bytes.toString(CryptoJS.enc.Utf8));
}

export const parseItem = (item: any): any => {
    if (item == null || item === undefined) {
        return null;
    }
    return JSON.parse(item);
}