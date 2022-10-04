export interface Quote {
    c:  number;
    d:  number;
    dp:  number;
    h:  number;
    l:  number;
    o:  number;
    pc: number;
    t:  number;
}


export interface Company {
    count:  number;
    result: Result[];
}

export interface Result {
    description?:   string;
    displaySymbol?: string;
    symbol?:        string;
    type?:          string;
}

export interface Sentiment {
    data:   Datum[];
    symbol: string;
}

export interface Datum {
    symbol: string;
    year:   number;
    month:  number;
    change: number;
    mspr:   number;
}

