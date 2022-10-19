const isDevelopment = () => {
  let isDevelopment = false;

  if (process && process.env.NODE_ENV === 'development') {
    isDevelopment = true;
  }

  return isDevelopment;
};

const mapProductsFromPromo = (pc: any) => {
  return pc.promoProducts.map((p: any) => {
    const name = p.friendlyName ? p.friendlyName : p.productName;
    const price = p.productRate;
    const discount = p.productDiscountAmount;
    const productCode = p.productCode;
    const promoCode = pc.dealPromoCode;
    const subcategory = p.subcategory;
    const onceOffCharge = p.onceOffCharge;
    const dealPromoCodeCategory = filterProductImageNames(p.subcategory);
    const summary = p.summary;
    const highlights = p.highlights;
    const image = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/images/chips-images/${dealPromoCodeCategory?.toLowerCase()}.png`;
    const isAddedToCart = false;
    const chargePeriod = p.chargePeriod;
    const minimumContractMonths = p.minimumContractMonths;
    return {
      name,
      price,
      onceOffCharge,
      minimumContractMonths,
      chargePeriod,
      discount,
      summary,
      highlights,
      productCode,
      promoCode,
      subcategory,
      image,
      isAddedToCart,
    };
  });
};

const filterProductImageNames = (name: string) => {
  if (name?.toLowerCase().includes('office')) return 'office';
  if (name?.toLowerCase().includes('vumatel')) return 'vuma';
  if (name?.toLowerCase().includes('vuma-reach')) return 'vuma-reach';
  if (name?.toLowerCase().includes('century-city-connect')) return 'century';
  if (name?.toLowerCase().includes('online identity protection')) return 'online-identity-protection';

  return name;
};

const detailsProductsFibre = (obj: any) => {
  if (!obj) return null;

  const promocode_details = obj.promocode_details;
  const product = obj.product;

  const friendlyName = product ? product.friendlyName : '';
  const summary = product ? product.summary : '';
  const highlights = product ? product.highlights : '';

  const description = promocode_details ? promocode_details.description : '';

  return {
    promocode_details,
    product,
    friendlyName,
    description,
    summary,
    highlights,
  };
};

const buildRouterOptions = (data: any, index: number, tillSlips: any) => {
  const promoDeals = data.promocode_deals.deals.filter((p: any) => (p.minProductsRequiredOSU == data.product.category.toLowerCase().includes('lte') ? 1 : 0));

  const fibreOptionalProducts = promoDeals.flatMap(mapProductsFromPromo);

  // get selectable routers
  const routers = fibreOptionalProducts
    .filter((product: any) => product.subcategory.toLowerCase().includes('router'))
    .map((router: any, i: number) => {
      router.id = index;
      router.image = Utilities.getRouterImage(router);
      router.fibreProductCode = data.product.productCode;
      router.fibrePromoCode = data.promocode_details.promoCode;
      router.tillSlipData = getRouterTillSlip(router, tillSlips);
      return router;
    });

  //console.log("======== BUILD ROUTERS ========");
  //console.log(routers);

  return routers;
};

function getRouterTillSlip(router: any, tillSlips: any) {
  // console.log("======== GET ROUTER TILLSLIP ========");
  // console.log("Data", tillSlips);

  const productCode = router.fibreProductCode.toLowerCase();
  const promoCode = router.fibrePromoCode.toLowerCase();
  const routerProductCode = router.productCode ? `-${router.productCode.toLowerCase()}` : '';

  const tillSlipKey = `${productCode}-${promoCode}${routerProductCode}`;
  // console.log("tillslipKey: ", tillSlipKey);

  const tillSlip = tillSlips.find((i: any) => i.key === tillSlipKey);

  return tillSlip.tillSlip;
}

const buildTillSlip = (primaryProductCode: string, primaryPromoCode: string, additionalProducts: any) => {
  let tillSlip = {
    currentQuoteId: null,
    shoppingCart: [
      {
        products: [
          {
            parentContractId: 0,
            primary: true,
            productCode: primaryProductCode,
            promoCode: primaryPromoCode,
            saleType: 'New',
          },
        ],
      },
    ],
  };

  if (additionalProducts && additionalProducts.length > 0) {
    additionalProducts.forEach((product: any) => {
      tillSlip.shoppingCart[0].products.push({
        parentContractId: 0,
        primary: false,
        productCode: product.productCode,
        promoCode: product.promoCode,
        saleType: 'New',
      });
    });
  }

  return tillSlip;
};

const updateTillSlip = (productCode: string, promoCode: string, router: any) => {
  let tillSlip = {
    currentQuoteId: null,
    shoppingCart: [
      {
        products: [
          {
            parentContractId: 0,
            primary: true,
            productCode: productCode,
            promoCode: promoCode,
            saleType: 'New',
          },
        ],
      },
    ],
  };

  if (router) {
    // don't add "No Router" option
    if (router.price > 0) {
      //console.log("-------- HAS ROUTER --------");
      tillSlip.shoppingCart[0].products.push({
        parentContractId: 0,
        primary: false,
        productCode: router.productCode,
        promoCode: router.promoCode,
        saleType: 'New',
      });
    }

    return tillSlip;
  }

  return null;
};

const setInitalSelectedTillSlip = (tillSlipsArray: any[]) => {};

const getRouterImage = (product: any) => {
  return `${process.env.NEXT_PUBLIC_HARDWARE_API_URL}/${product.productCode}.png`;
};

const getChipsImage = (product: any) => {
  return `${process.env.NEXT_PUBLIC_EXTRAS_API_URL}/${product.productCode}.png`;
};

const isDecimal = (num: number) => {
  return !!(num % 1);
};

const parseDecimal = (numberVal: number, int: number) => {
  if (Number.isInteger(numberVal)) {
    return numberVal.toFixed(int);
  } else {
    return numberVal;
  }
};

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const currencyFormat = (num: number, decimalPlaces: number) => {
  let tempNum = typeof num === 'string' ? parseFloat(num) : num;

  const spacedValue = tempNum.toFixed(decimalPlaces).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  const formattedValue = spacedValue.split('.')[1] === '00' ? spacedValue.split('.')[0] : spacedValue;

  return `R${formattedValue}`;
};

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const guid = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const removeRand = (str: string) => {
  str = str.toString();
  str = str.replace('R', '').replace(',', '');

  const rand = Number(str);

  if (str !== 'Free') {
    const cents = (rand * 100) % 100;

    if (cents >= 1) {
      return str;
    } else {
      return rand;
    }
  } else {
    return 0;
  }
};

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
};

const formatSpeed = (speed: number) => {
  switch (speed) {
    case 1024:
      return '1Gbps';
    default:
      return `${speed}Mbps`;
  }
};

const dataDisplay = (strData: string, hasTerabByteValue: any) => {
  // console.log("data display: ", strData, hasTerabByteValue)
  switch (strData) {
    case hasTerabByteValue:
      return strData;
    case '0GB':
      return 'Uncapped';
    default:
      return strData;
  }
};

export const Utilities = {
  isDevelopment: isDevelopment,
  mapProductsFromPromo: mapProductsFromPromo,
  detailsProductsFibre: detailsProductsFibre,
  getRouterImage: getRouterImage,
  getChipsImage: getChipsImage,
  filterProductImageNames: filterProductImageNames,
  buildRouterOptions: buildRouterOptions,
  buildTillSlip: buildTillSlip,
  updateTillSlip: updateTillSlip,
  parseDecimal: parseDecimal,
  numberWithCommas: numberWithCommas,
  removeRand: removeRand,
  currencyFormat: currencyFormat,
  guid: guid,
  isMobileDevice: isMobileDevice,
  dataDisplay: dataDisplay,
  formatSpeed: formatSpeed,
};
