export const parceParamsUrlToObj = (
    url: string,
    options: {
        shouldDeletedString?: string;
    }
) => {
    const { shouldDeletedString } = options;
    if (shouldDeletedString) url = url.replace(shouldDeletedString, '');
    const urlWithParams = url.split('?');
    const arrayOfString: string[] = urlWithParams[0].split('/');
    const obj: {
        [x: string]: any;
    } = {};
    arrayOfString.forEach((item) => {
        const arrayKeyValue = item.split('_');
        const key = arrayKeyValue[0];
        arrayKeyValue.shift();
        obj[key] = arrayKeyValue;
    });
    return obj;
};
export const createUrlString = (obj: { [x: string]: any }) => {
    let str = '';
    for (const key in obj) {
        const element = obj[key];
        if (Array.isArray(element)) {
            if (element.length > 0) str = `${str}${key}_${element.join('_')}/`;
        } else {
            str = `${str}${key}_${String(element)}/`;
        }
    }
    return str;
};
