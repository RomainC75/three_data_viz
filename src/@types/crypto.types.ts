export interface ILightValue{
    value: number;
    timestamp: number;
    microtimestamp: number;
}

export interface IValue extends ILightValue{
    currencyPair: string;
}

export type IData = {[key: string]: ILightValue[]}

export interface ICryptoData{
    refresh_delay_s: number;
    period_s: number;
    data: IData;
}

