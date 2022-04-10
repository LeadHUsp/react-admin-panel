export default function formatedDepthsCategories(arrayOfObject: any) {
    let categoryNamesObj: any = {};

    function depthSearch(arrayOfObject: any) {
        arrayOfObject.forEach((item: any) => {
            if (item.children && item.children.length > 0) {
                categoryNamesObj[item._id] = item;
                depthSearch(item.children);
            } else {
                categoryNamesObj[item._id] = item;
            }
        });
    }
    depthSearch(arrayOfObject);

    return categoryNamesObj;
}
export function transformMultilevelDepth(array: any, keyOfChild: string) {
    let dataArray: any[] = [];
    const formatData = (array: any) => {
        array.forEach((item: any) => {
            dataArray.push(item);
            if (item[keyOfChild].length > 0) {
                formatData(item.children);
            }
        });
    };
    formatData(array);
    return dataArray;
}
