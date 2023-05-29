export interface iSend {
  name: string;
  images: string[];
  id: string;
  desc: string;
}

export interface iProdSumary {
  name: string;
  img: string;
  price: number;
  prodId: string;
  prodCount: number;
  isSale: boolean;
  salePrice: number;
}

export interface ImageArr {
  data: File;
  url: string;
}

export interface iSaleDtails {
  startDate: Date;
  endDate: Date;
  saleType: string;
}
export interface iProduct {
  id: string;
  name: string;
  desc: string;
  size: string;
  color: string;
  priceRaw: number;
  priceSell: number;
  markupPercentage: number;
  discountPercentage: number;
  stock: number;
  images: string[];
  category: string;
  subcategory: string;
  rating: number;
  brand: string;
  isOnSale: boolean;
  // saleDetails: iSaleDtails | null;
  dateCreated: Date;
}

export interface iProductCreator {
  id: string;
  name: string;
  desc: string;
  size: string;
  color: string;
  priceRaw: number;
  priceSell: number;
  markupPercentage: number;
  discountPercentage: number;
  stock: number;
  images: ImageArr[];
  category: string;
  subcategory: string;
  rating: number;
  brand: string;
}

export interface iOrder {
  products: iCart[];
  ordertracking: iOrderTracking;
  isPaid: boolean; // reflects in company account
  pop: string; //file uploaded to storage get that string
  inv: string;
}

export interface iOrderTracking {
  orderDate: string;
  paymentDate: string;
  orderPackedDate: string;
  shippingDate: string;
  deliveryDate: string;
  delivered: boolean;
  notes: string;
  trackingNr: string;
}

export interface iCart extends iProdSumary {}
export interface iWishList extends iProdSumary {}

export const ColorsArr = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenRod',
  'Darkprimary',
  'Darkprimary',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateprimary',
  'DarkSlateprimary',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'Dimprimary',
  'Dimprimary',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'primary',
  'primary',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'Lightprimary',
  'Lightprimary',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateprimary',
  'LightSlateprimary',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RebeccaPurple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'Slateprimary',
  'Slateprimary',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen',
];

export interface iCatSubCat {
  id: string;
  name: string;
  images: ImageArr[];
  desc: string;
}

export interface iInventory {
  [cat: string]: {
    name: string;
    images: string[];
    subCat: {
      name: string;
      images: string[];
      products: {};
    };
  };
}
