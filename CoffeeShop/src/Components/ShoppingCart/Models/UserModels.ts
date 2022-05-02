import { iProductOredered } from './UserModels';
import { LoginUser } from './../../Authentication/userModels&&FormProps';
import { iProduct } from './AdminModels';

export interface iPrepMethode{
    eggType : [ "None", "fried", "scrambled"]
    toastType : ["None",  "brown", "white"]
    tomatoType : [ "None", "fresh", "grilled"]
    addOnBrekkie : ["None", "Fries","Mushrooms","Hash Brown","Onion","Bacon","Cheese","Cheese Griller","Sausage","BakedBeans"]
    SizeType : ["None",  "Single", "Tall"]
    MilkType : ["None",  "Soya", "Cows"]
    SyrupType : [ "None", "Mint", "Caramel","Hazelnut", "Vanilla","Toffee Caramel ", "Banana" ,"Extra shot Espresso"]
}


export interface iProductOredered{
    ProdName: string,
    ProdPrice: number;
    Content: string[],
    ContentPrep: string[]
    Extras: string[]
}

export interface iOrder {
    OrderName: string;
    OrderAdress?: string;
    OrderContact: string;

    OrderProducts: string[];
    ProdPerOrder?: iProduct[];
    OrderProductsprepM: string[]

    PickOrDel: string;
    PaymentMethod: string;
    POP?: string;
}


export interface iCart {
    User: LoginUser;
    ItemsOrdered: iProductOredered[]
}



