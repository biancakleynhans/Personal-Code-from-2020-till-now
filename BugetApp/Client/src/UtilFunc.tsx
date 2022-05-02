export function  S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function generator(): string {
    const isString = `${S4()}${S4()}`;  //-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}
    return isString;
}
