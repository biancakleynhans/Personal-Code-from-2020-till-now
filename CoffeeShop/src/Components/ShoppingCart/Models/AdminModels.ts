import { iProduct } from './AdminModels';

export interface iItem {
    
    _id?: string
    Name: string,
    ItemCost: number,
    PortionSize:number
    PortionValue: string
    PrepMethod?: string[]
}

export interface iProduct{
    _id?: string
    Name: string;
    Price: number;
    Description: string;
    Content: iItem[]
}

export interface iCatagory{
    _id?: string
    Name: string;
    Products : iProduct[]
}

export interface iPrepList {
    Egg : string[] ,
    Toast : string[] ,
    Tomato : string[] ,
    Milk : string[] ,
    FlavoredSyrup : string[] ,
    SizeType : string[] ,
    None: string[] 
}

export const prepList = {
    Egg : [ "No Eggs", "Fried Egg", "Scrambled Egg"],
    Toast : ["No Toast",  "Brown Toast", "White Toast"],
    Tomato : [ "No Tomato", "Fresh Tomato", "Grilled Tomato"],
    Milk : ["No Milk",  "Soya Milk", "Cows Milk"],
    FlavoredSyrup : [ 
        "No Flavoured Syrup", 
        "Mint Syrup", "Caramel Syrup",
        "Hazelnut Syrup", "Vanilla Syrup",
        "Toffee Caramel Syrup ", "Banana Syrup" 
        ,"Extra shot Espresso"
    ],
    SizeType : ["Single", "Tall", "Grande"],
    addOnBrekkie : [
      "No Extra's", "Fries Extra","Mushrooms Extra",
      "Hash Brown Extra","Onion Extra",
      "Bacon Extra","Cheese Extra",
      "Cheese Griller Extra","Sausage Extra",
      "BakedBeans Extra"
    ],
    None: []
}

export const PreplistItemsToChooseFromOptions = [
    "None",
    "No Eggs", "Scrambled Egg","Soft Eggs", "Hard Egg", "Medium Egg", "Sunny Side Eggs",
    "No Toast",  "Brown Toast", "White Toast",
    "No Tomato", "Fresh Tomato", "Grilled Tomato",
    "No Milk",  "Soya Milk", "Cows Milk",
    "No Flavoured Syrup", 
    "Mint Syrup", "Caramel Syrup","Hazelnut Syrup", "Vanilla Syrup",
    "Toffee Caramel Syrup ", "Banana Syrup" ,"Extra shot Espresso",
    "Single", "Tall", "Grande",
    "No Extra's", "Fries Extra","Mushrooms Extra",
    "Hash Brown Extra","Onion Extra",
    "Bacon Extra","Cheese Extra",
    "Cheese Griller Extra","Sausage Extra",
    "BakedBeans Extra"
]

export const Checkout = {
    PickDel: ["Collect","Delivery"],
    Payment : ["Cash", "Zapper", "Eft"]
}

export const TypeOption = 
{
    none: "None",
    //Food
    toast: "Toast",
    egg: "Egg",
    tomato: "Tomato",
    addOnBrekkie: "addOnBrekkie",

    //Drinks
    espresso: "Espresso",
    milk : "Milk",
    soyaMilk: "Soya Milk", 
    flavoredSyrup : "Flavored Syrup",
    sizeType : "SizeType",
}

export const Catagories ={
  toasties: "Toasties",
  barista: "From The Barista"
}
  