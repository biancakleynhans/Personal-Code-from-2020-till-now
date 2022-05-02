// Price_per_2_units: string;
// Price_per_10_units: string;
// Price_per_25_units: string;
// Price_per_50_units: string;
// Price_per_75_units: string;
// Price_per_100_units: string;

export interface ImageArr {
  data: File;
  url: string;
}

export interface PrintProduct {
  Name: string;
  Desc: string;
  Sides: string[];
  Color: string[];
  Processing: string[];
  DesignFee: string;
  HardProof: string;
  PaperMaterial: string[];
  Size: string[];
  Price_per_unit: string;
  ImageFiles: ImageArr[];
  extras: any[];
}

export interface PrettyProduct {
  Name: string;
  Desc: string;
  DesignFee: string;
  HardProof: string;
  PaperMaterial: string[];
  Size: string[];
  Price_per_unit: string;
  ImageFiles: any[];
  extras: any[];
}

export interface WebProduct {
  Name: string;
  Desc: string;
  DesignFee: string;
  Price_per_unit: string;
  ImageFiles: any[];
  extras: any[];
}

export interface ProductListPrint {
  // CATEGORY: LIST OF PRODUCTS
  [k: string]: PrintProduct[];
}

export interface ProductListPretty {
  // CATEGORY: LIST OF PRODUCTS
  [k: string]: PrettyProduct[];
}

export interface ProductListWeb {
  // CATEGORY: LIST OF PRODUCTS
  [k: string]: WebProduct[];
}
