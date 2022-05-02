import { iItem, iProduct } from './AdminModels';

export interface OtherProps {
    title?: string;
    buttonText?:string;
}

export interface OtherProps {
    title?: string;
    buttonText?:string;
    catName?:string
}


export interface FormPropsItem {
    initialName?: string,
    initialItemCost?: number,
    initialPortionSize?:number
    initialPortionValue?: string,
    initialPrepMethod?: string[]
}


export interface FormPropsProduct {
    _id?: string;
    initialName?: string;
    initialPrice?: number;
    initialDescription?: string;
    initialContent?: iItem[]
    initialPrepMethod?: string[]
}

export interface FormPropsCatagory {
    initialName?: string;
    initialProducts?: iProduct[]
}


export interface FormPropsProductOredered{
    initialProdName?: string,
    initialContent?: string[],
    initialContentPrep?: string[]
    initialExtras?: string[]
}

export interface FormPropsOrder {
    initialOrderName?: string;
    initialOrderAdress?: string;
    initialOrderContact?: string;

    initialOrderProducts?: string[];
    initialOrderProductsprepM?: string[]
    initialPickOrDel?: string;
    initialPaymentMethod?: string;
    initialPOP?: string;
}
