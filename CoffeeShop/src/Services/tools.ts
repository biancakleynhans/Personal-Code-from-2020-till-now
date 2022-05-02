interface runtimeInjected{
    forceUpdate:(v:string)=>void,
    setLoading:(a:string)=>void,
}

export const appInj:runtimeInjected={
    forceUpdate:()=>{},
    setLoading:(a)=>{},  
}

export function IsIE():boolean
{
    var func = window && (window.navigator.userAgent.indexOf("MSIE ")>=0 || window.navigator.userAgent.indexOf("Trident")>=0) ? true: false
    console.log(func)
    return func
}

export class NamedDict<T>
{
    [v:string]:T 
}
export function NamedDictKeyValues<T>(d:NamedDict<T>)
{
    return Object.keys(d).map(k=>{return { k:k,v:d[k] }})
}

function  S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function generator(): string {
    const isString = `${S4()}${S4()}`;  //-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}
    return isString;
}
