declare global { interface Array<T> {
    findRecursive<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => boolean, childrenPropertyName: any): S | undefined;
    filterRecursive<S extends T>(predicate: (value: T, index: number, array: T[]) => boolean, childProperty: any): S[];
}}

Array.prototype.findRecursive = function(predicate: any, childrenPropertyName: any){
    if(!childrenPropertyName){
        throw "findRecursive requires parameter `childrenPropertyName`";
    }
    let array = [];
    array = this;
    let initialFind =  array.find(predicate);
    let elementsWithChildren  = array.filter(x=>x[childrenPropertyName]);
    if(initialFind){
        return initialFind;
    }else if(elementsWithChildren.length){
        let childElements: any[] = [];
        elementsWithChildren.forEach(x=>{
            childElements.push(...x[childrenPropertyName]);
        });
        return childElements.findRecursive(predicate, childrenPropertyName);
    }else{
        return undefined;
    }
}
Array.prototype.filterRecursive = function(predicate: any, childProperty: any){
    let filterResults: any[] = [];
    let filterAndPushResults = (arrayToFilter: any)=>{
        let elementsWithChildren  = arrayToFilter.filter((x: any)=>x[childProperty]);
        let filtered = arrayToFilter.filter(predicate);
        filterResults.push(...filtered);
        if(elementsWithChildren.length){
            let childElements: any[] = [];
            elementsWithChildren.forEach((x: any)=>{
                childElements.push(...x[childProperty]);
            });
            filterAndPushResults(childElements);
        }
    };
    filterAndPushResults(this);
    return filterResults;
}
export {}