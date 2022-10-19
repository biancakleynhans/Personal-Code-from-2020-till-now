import useSWR from 'swr';
import { fetchFromServer } from '../utils/fetching';
import { getBooleanOrDefault, getNumber, getNumberOrDefault, getString, ILteProductUrlType, isObject } from '../utils/types';
import {CampaignCategory, CampaignChannel, getCampaigns, getPrivateCampaigns, ICampaign} from './campaignsService';
import { ILteProvider, lteProviders } from './providerService';

import { getProductUrls, generateLteProductUrls } from './publicProductUrlsService';

enum LteHeroOption {
  INCOGNITO_JOURNEY = 'IncognitoJourneyOnly',
  COVERAGE_SEARCH_JOURNEY = 'CoverageSearchedJourneyOnly',
  INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY = 'AllUserJourneys',
  NOT_APPLICABLE = 'na',
}

interface ILtePromo {
  promoCode: string | null;
  promoCodeTagLine: string | null;
  promoCodeDescription: string | null;
  promoUrlSlug: string;
  promoProductTagline: string;
  promoProductDescription: string;
}

interface ILteProduct {
  campaignCode: string | null;
  campaignName: string | null;
  promoCode: string | null;
  providerCode: string | null;
  productCode: string | null;
  productDisplayName: string | null;
  productDisplayPrice: number | null;
  productChargePeriod: string | null;
  standardCapGB: number | null;
  nighttimeCapGB: number | null;
  cappedStatus: string | null;
  isHero: boolean;
  heroTagline: string | null;
  heroImage: string | null;
  heroOption: LteHeroOption;
  url: string;
  newUrl: string;
  uncappedLine1: string | null;
  uncappedLine2: string | null;
  hasPreProduct: boolean;
  preProduct: IPreProduct;
  tagLine: string;
  promoUrlSlug: string;
  promoProductTagline: string;
  promoProductDescription: string;
  hasTeraByteValue?: boolean;
}

interface IPreProduct {
  preProductCode: string;
  preProductName: string;
  preProductFriendlyName: string;
  preProductInvoiceRollupDescription: string;
  preProductRate: number;
  preProductDiscountAmount: number;
  preProductDiscountType: string;
  preProductDiscountedProductRate: number;
  preProductDiscountPeriodInDays: number;
  preProductDiscountSavings: number;
  preProductDisplay: string;
}

interface ILteRecommendedProduct {
  name: string;
  price: number;
  discount?: () => number;
  summary: string;
  highlights: string;
  productCode: string;
  promoCode: string;
  image: string;
}

interface ILteUpsellProduct {
  id: number;
  heading: string;
  title: string;
  deal: string;
  price: string;
  providerLogo: string;
  productUrl: string;
  newProductUrl: string;
  downloadSpeedMbps?: number | null;
  uploadSpeedMbps?: number | null;
  totalData?: string | null;
}

interface ILteProductData {
  products: ILteProduct[];
  campaigns: ICampaign[];
}

interface IUseLteProducts {
  campaigns: ICampaign[];
  products: ILteProduct[];
  loading: boolean;
  error: any;
}

function convertCapToGB(cap: unknown): number | null {
  if (typeof cap === 'string') {
    const capGB = Number(cap?.toLowerCase()?.replace('gb', '')?.trim());
    const capTB = Number(cap?.toLowerCase()?.replace('tb', '')?.trim());

    if (!Number.isNaN(capGB) || !Number.isNaN(capTB)) {
      return capGB || capTB;
    }
  }

  return null;
}

function convertResponseItemToProduct(item: any, promo: ILtePromo, campaign: ICampaign, urls: Array<any>): ILteProduct | null {
  if (!isObject(item)) {
    return null;
  }

  /* Get the provider using the product subcategory */
  const productSubcat = item?.subcategory.trim();
  const provider = lteProviders.find((p) => p.productSubcat === productSubcat);
  if (!provider) {
    console.warn(`Cannot resolve lte provider from provider name = ${productSubcat}`);
    return null;
  }

  if (!provider.active) {
    console.warn(`Skipping product from inactive lte provider = ${productSubcat}`);
    return null;
  }

  const productCode = getString(item?.productCode);

  // Use friendly name if available otherwise use product name
  const friendlyName = getString(item?.friendlyName?.trim());
  const productName = getString(item?.productName?.trim());
  const productDisplayName = friendlyName ? friendlyName : productName;

  // Use the display name if >= 0 otherwise the product rate
  const displayPrice = getNumberOrDefault(item?.displayPrice, -1);
  const productRate = getNumber(item?.productRate);
  const productDisplayPrice = displayPrice > 0 ? displayPrice : productRate;
  const productChargePeriod = getString(item?.chargePeriod);

  const standardCapParam = item?.parameters?.find((p: any) => p.name === 'standardCap');
  const standardCapGB = convertCapToGB(standardCapParam?.value);

  const nighttimeCapParam = item?.parameters?.find((p: any) => p.name === 'nightTimeCap');

  const nighttimeCapGB = convertCapToGB(nighttimeCapParam.value);

  // setting a flag for an item that has a terabyte value to pass in as a props
  const itemHasTeraByteValue = standardCapParam?.value?.toLowerCase()?.includes('tb') || nighttimeCapParam?.value?.toLowerCase()?.includes('tb');

  const isCappedParam = item?.parameters?.find((p: any) => p.name === 'isCapped');
  const cappedStatus = getString(isCappedParam?.value);

  const isHero = getBooleanOrDefault(item?.isHero, false);
  const heroTagline = getString(item?.heroTagLine);
  const heroImage = getString(item?.heroImage);

  const newUrl = urls.find((i) => i.productCode === item.productCode && i.promoCode === promo.promoCode)?.productUrl;
  if (!newUrl) {
    console.warn(`${item.productCode} -- ${promo.promoCode} : Skipping product with invalid urls`);
    return null;
  }

  let heroOption: LteHeroOption;
  switch (getString(item?.heroOption)) {
    case LteHeroOption.INCOGNITO_JOURNEY:
      heroOption = LteHeroOption.INCOGNITO_JOURNEY;
      break;
    case LteHeroOption.COVERAGE_SEARCH_JOURNEY:
      heroOption = LteHeroOption.COVERAGE_SEARCH_JOURNEY;
      break;
    case LteHeroOption.INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY:
      heroOption = LteHeroOption.INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY;
      break;
    default:
      heroOption = LteHeroOption.COVERAGE_SEARCH_JOURNEY;
  }

  // old url for NG App redirect
  // REFACTOR

  // const url =
  //   urls.length > 1 && campaign.code.toString().includes("ROUTER")
  //     ? urls[1].oldProductUrl
  //     : urls.length > 0
  //     ? urls[0].oldProductUrl
  //     : "";

  const urlData = <ILteProductUrlType>{
    type: 'lte',
    campaignCode: campaign?.code,
    productCode: productCode,
    promoCode: promo?.promoCode,
    friendlyName: friendlyName,
    productName: productName,
    productDisplayName: productDisplayName,
    displayPrice: displayPrice,
    productRate: productRate,
    productDisplayPrice: productDisplayPrice,
    productChargePeriod: productChargePeriod,
    standardCapParam: standardCapParam,
    standardCapGB: standardCapGB,
    nighttimeCapParam: nighttimeCapParam,
    nighttimeCapGB: nighttimeCapGB,
    cappedStatus: cappedStatus,
  };

  const url = generateLteProductUrls(urlData);

  // console.log(
  //   "%c ======== LTE PRODUCT URLS ========",
  //   "color: pink; font-weight: 900"
  // );
  // console.log(urlData);
  // console.log(
  //   "%c ======== LTE GENERATED URL ========",
  //   "color: pink; font-weight: 900"
  // );
  // console.log(url);

  //const url = `/lte/${provider.productUrlSlug}/${standardCapGB}gb-anytime-data-${nighttimeCapGB}gb-night-time-data`;

  const uncappedLine2 = standardCapGB && nighttimeCapGB ? null : getString(item?.highlight5);
  const uncappedLine1 = standardCapGB && nighttimeCapGB ? null : getString(item?.highlight6);

  return {
    campaignCode: campaign.code,
    campaignName: promo.promoCodeTagLine, //campaign.name,
    promoCode: promo.promoCode,
    providerCode: provider.code,
    productCode,
    productDisplayName,
    productDisplayPrice,
    productChargePeriod,
    standardCapGB,
    nighttimeCapGB,
    cappedStatus,
    isHero,
    heroTagline,
    heroImage,
    heroOption,
    url,
    newUrl,
    uncappedLine1,
    uncappedLine2,
    hasPreProduct: item?.hasPreProduct,
    preProduct: item?.preProduct,
    tagLine: item?.tagLine,
    promoUrlSlug: promo?.promoUrlSlug,
    promoProductTagline: promo?.promoProductTagline,
    promoProductDescription: promo?.promoProductDescription,
    hasTeraByteValue: itemHasTeraByteValue,
  };
}

function convertResponseItemToPromo(item: any): ILtePromo | null {
  if (!isObject(item)) {
    return null;
  }

  const promoUS = getString(item?.promoUrlSlug);
  const promoPT = getString(item?.promoProductTagline);
  const promoPD = getString(item?.promoProductDescription);

  const promoCode = getString(item?.promoCode);
  const promoCodeTagLine = getString(item?.promoCodeTagLine);
  const promoCodeDescription = getString(item?.promoCodeDescription);
  const promoUrlSlug = promoUS !== null ? promoUS : '';
  const promoProductTagline = promoPT !== null ? promoPT : '';
  const promoProductDescription = promoPD !== null ? promoPD : '';

  return {
    promoCode,
    promoCodeTagLine,
    promoCodeDescription,
    promoUrlSlug,
    promoProductTagline,
    promoProductDescription,
  };
}

function sortProductsUncappedAndPrice(p1: ILteProduct, p2: ILteProduct) {
  const p1Capped = p1.cappedStatus === 'Capped';
  const p2Capped = p2.cappedStatus === 'Capped';

  const p1Price = p1.productDisplayPrice !== null ? p1.productDisplayPrice : 0;
  const p2Price = p2.productDisplayPrice !== null ? p2.productDisplayPrice : 0;

  if (p1Capped && p2Capped) {
    // If BOTH CAPPED sort by price descending
    return p1Price - p2Price;
  } else if (!p1Capped && !p2Capped) {
    // If BOTH UNCAPPED sort by price ascending
    return p2Price - p1Price;
  } else {
    // sort UNCAPPED before CAPPED
    if (p1Capped) {
      return 1;
    } else {
      return -1;
    }
  }
}

function useLteProducts(): IUseLteProducts {
  const { data, error } = useSWR(CampaignCategory.LTE, getLteProducts);

  const campaigns = data ? data.campaigns : [];
  const products = data ? data.products : [];

  return {
    campaigns,
    products,
    loading: !error && !data,
    error: error,
  };
}

function calculateTotalDataInGB(product: any): string {
  //Getting params for standard and night time data. Storing them in temporary variables
  let tempNightTimeCapParam = product?.parameters?.find((x: any) => x.name === 'nightTimeCap')?.value.split(' ');
  let tempStandardCapParam = product?.parameters?.find((x: any) => x.name === 'standardCap')?.value.split(' ');
  let hasTeraByteValue = false;

  if (tempNightTimeCapParam && tempStandardCapParam) {
    hasTeraByteValue = tempStandardCapParam[1]?.toLowerCase()?.includes('tb') || tempNightTimeCapParam[1]?.toLowerCase()?.includes('tb');
  }

  let nightTimeData = getProductParamFromProductParams(product, 'nightTimeCap')?.replace('GB', '')?.trim();
  let standardCap = getProductParamFromProductParams(product, 'standardCap')?.replace('GB', '')?.trim();

  let n = parseInt(nightTimeData);
  let s = parseInt(standardCap);
  let totalData = s + n;

  if (hasTeraByteValue) {
    return `${totalData.toFixed(0)}TB`;
  } else {
    return `${totalData.toFixed(0)}GB`;
  }
}

function getProductParamFromProductParams(product: any, paramName: string): string {
  return product?.parameters?.find((p: any) => p.name === paramName)?.value;
}

function getLteProvidersWithProducts(providers: ILteProvider[], products: ILteProduct[]) {
  const providersNoProducts = new Set<string>();
  for (let provider of providers) {
    const providerProducts = products.filter((product) => product.providerCode === provider.code);
    if (providerProducts.length === 0) {
      providersNoProducts.add(provider.code);
    }
  }

  if (providersNoProducts.size > 0) {
    // console.warn('lte providers with no products', providersNoProducts);
  }

  return providers.filter((provider) => !providersNoProducts.has(provider.code));
}

function excludeSimOnlyLTEProducts(products: ILteProduct[]): ILteProduct[] {
  //Start: PORTAL-19004: [Products] 2 quick changes to the front carousel
  return products?.sort((a: any, b: any) => a?.productDisplayPrice - b?.productDisplayPrice)?.filter((p) => p.campaignCode !== 'LTE-SIMONLY'); //PORTAL-19030: Dev - Implement changes to make the R299 product stand out
  //End: PORTAL-19004: [Products] 2 quick changes to the front carousel
}

async function getProductsForCampaign(campaign: ICampaign): Promise<ILteProduct[]> {
  const url = `${process.env.NEXT_PUBLIC_BAAS_BASE_URL}proxy/marketing/products/promos/${campaign.promocodes.join(',')}?sellable_online=true`;

  const response = await fetchFromServer(url);
  const data = await response.json();
  const productUrls = await getProductUrls();

  const products: ILteProduct[] = [];
  for (const promoItem of data) {
    try {
      const promo = convertResponseItemToPromo(promoItem);
      if (!promo) {
        continue;
      }

      for (const productItem of promoItem.products) {
        try {
          const urls = productUrls.filter((url: any) => url.productCode === productItem.productCode);

          const product = convertResponseItemToProduct(productItem, promo, campaign, urls.length > 0 ? urls : []);

          if (product) {
            products.push(product);
          }
        } catch (productError) {
          console.error(`error processing product for lte promo code ${promo.promoCode}`, productError);
        }
      }
    } catch (promoError) {
      console.error(`error processing lte promo code ${promoItem?.promoCode}`, promoError);
    }
  }

  return products;
}


async function getLteProducts(channel: CampaignChannel = CampaignChannel.NEW_CUSTOMERS): Promise<ILteProductData> {
  const { campaigns } = await getCampaigns({
    category: CampaignCategory.LTE,
    channel,
  });

  const productPromises = campaigns
    //.filter((c) => c.isStandardCampaign || c.isDefaultCampaign)
    .map((c) => getProductsForCampaign(c));
  const productResponses = await Promise.all(productPromises);
  const products = productResponses.flatMap((r) => r);
  products.sort(sortProductsUncappedAndPrice);

  // console.log("======== Product Responses ========");
  // console.log(campaigns);

  return { products, campaigns };
}

async function getPrivateLteProducts(campaignCode: string): Promise<ILteProductData> {
  const { campaigns } = await getPrivateCampaigns('lte');

  const productPromises = campaigns
      .filter((c) => c.code === campaignCode)
      .map((c) => getProductsForCampaign(c));
  const productResponses = await Promise.all(productPromises);
  const products = productResponses.flatMap((r) => r);
  products.sort(sortProductsUncappedAndPrice);

  // console.log("======== Campaigns ========");
  // console.log(campaigns);

  // console.log("======== Filtered Campaigns ========");
  // console.log(campaigns.filter((c) => c.code === campaignCode));

  // console.log("======== Campaign Products ========");
  // console.log(products);

  return { products, campaigns };
}

export { getProductParamFromProductParams, calculateTotalDataInGB, getLteProducts, useLteProducts, getLteProvidersWithProducts, excludeSimOnlyLTEProducts, getPrivateLteProducts };

export type { ILteProduct, ILtePromo, ILteRecommendedProduct, ILteUpsellProduct, IPreProduct };
