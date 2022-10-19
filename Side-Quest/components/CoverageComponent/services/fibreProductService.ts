import useSWR from 'swr';
import { getProductUrls, generateFibreProductUrls, generateNewFibreProductUrl } from './publicProductUrlsService';
import { fetchFromServer } from '../utils/fetching';
import {CampaignCategory, CampaignChannel, getCampaigns, getPrivateCampaigns, ICampaign} from './campaignsService';
import { getBooleanOrDefault, getNumber, getNumberOrDefault, getString, IFibreProductUrlType, isObject } from '../utils/types';
import { fibreProviders } from './providerService';

enum FibreHeroOption {
  INCOGNITO_JOURNEY = 'IncognitoJourneyOnly',
  COVERAGE_SEARCH_JOURNEY = 'CoverageSearchedJourneyOnly',
  INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY = 'AllUserJourneys',
  NOT_APPLICABLE = 'na',
}

interface IFibreProvider {
  code: string;
  name: string;
  productSubcat: string;
  logoUrl: string;
  productUrlSlug: string;
  coverageCode: string;
  active: boolean;
}

interface IUseFibreProducts {
  campaigns: ICampaign[];
  products: IFibreProduct[];
  loading: boolean;
  error: any;
}

interface IFibrePromo {
  promoCode: string | null;
  promoCodeTagLine: string | null;
  promoCodeDescription: string | null;
  coverageStatusDisplayValue: string | null;
  coverageStatusOptionKey: string | null;
  promoCodeCategory: string | null;
  promoCodeSubcategory: string | null;
  promoUrlSlug: string;
  promoProductTagline: string;
  promoProductDescription: string;
}

interface IFibreProduct {
  providerName: string | null;
  campaignCode: string | null;
  campaignName: string | null;
  promoCode: string | null;
  coverageStatusDisplayValue: string | null;
  coverageStatusOptionKey: string | null;
  promoCodeCategory: string | null;
  promoCodeSubcategory: string | null;
  providerCode: string | null;
  coverageCode: string | null;
  productCode: string | null;
  productDisplayName: string | null;
  productDisplayPrice: number | null;
  productChargePeriod: string | null;
  downloadSpeedMbps: number | null;
  uploadSpeedMbps: number | null;
  cappedStatus: string | null;
  throttledStatus: string | null;
  isHero: boolean;
  heroTagline: string | null;
  heroImage: string | null;
  heroOption: FibreHeroOption;
  url: string;
  newUrl: string;
  hasPreProduct: boolean;
  preProduct: IPreProduct;
  tagLine: string;
  promoUrlSlug: string;
  promoProductTagline: string;
  promoProductDescription: string;
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

interface IFibreRecommendedProduct {
  name: string;
  price: number;
  discount?: () => number;
  summary: string;
  highlights: string;
  productCode: string;
  promoCode: string;
  image: string;
}

interface IFibreUpsellProduct {
  id: number;
  heading: string;
  title: string;
  deal: string;
  price: string;
  providerLogo: string;
  productUrl: string;
  newProductUrl: string;
  downloadSpeedMbps?: string | null;
  uploadSpeedMbps?: string | null;
}

interface IFibreProductData {
  products: IFibreProduct[];
  campaigns: ICampaign[];
}

function convertKbpsToMbps(speedKbps: unknown): number | null {
  if (typeof speedKbps === 'string') {
    const speedMbps = Number(speedKbps.toLowerCase().replace('kbps', '').trim()) / 1024;
    if (!Number.isNaN(speedMbps)) {
      return speedMbps;
    }
  }

  return null;
}

function convertResponseItemToProduct(item: any, promo: IFibrePromo, campaign: ICampaign, urls: Array<any>): IFibreProduct | null {
  if (!isObject(item)) {
    return null;
  }

  const productCode = getString(item?.productCode);

  /*
   * Get the provider using the product subcategory
   */
  const productSubcat = item?.subcategory?.replace('Uncapped', '')?.replace('Capped', '')?.trim();
  const provider = fibreProviders.find((p) => p.productSubcat === productSubcat);

  if (!provider) {
    console.warn(`${productCode}: Skipping product as fibre provider cannot be resolved from provider, product subcategory = ${productSubcat}`);
    return null;
  }

  if (!provider.active) {
    console.warn(`${productCode}: Skipping product as fibre provider is inactive, provider name  = ${provider.name}`);
    return null;
  }

  // Use friendly name if available otherwise use product name
  const friendlyName = getString(item?.friendlyName?.trim());
  const productName = getString(item?.productName?.trim());
  const productDisplayName = friendlyName ? friendlyName : productName;

  // Use the display name if >= 0 otherwise the product rate
  const displayPrice = getNumberOrDefault(item?.displayPrice, -1);
  const productRate = getNumber(item?.productRate);
  const productDisplayPrice = displayPrice > 0 ? displayPrice : productRate;
  const productChargePeriod = getString(item?.chargePeriod);

  const downloadSpeedParam = item?.parameters?.find((p: any) => p.name === 'downloadSpeed');
  const downloadSpeedMbps = convertKbpsToMbps(downloadSpeedParam?.value);

  const uploadSpeedParam = item?.parameters?.find((p: any) => p.name === 'uploadSpeed');
  const uploadSpeedMbps = convertKbpsToMbps(uploadSpeedParam?.value);

  const isCappedParam = item?.parameters?.find((p: any) => p.name === 'isCapped');
  const cappedStatus = getString(isCappedParam?.value);

  const isThrottledParam = item?.parameters?.find((p: any) => p.name === 'isThrottled');
  const throttledStatus = getString(isThrottledParam?.value);

  const isHero = getBooleanOrDefault(item?.isHero, false);
  const heroTagline = getString(item?.heroTagLine);
  const heroImage = getString(item?.heroImage);

  let heroOption: FibreHeroOption;
  switch (getString(item?.heroOption)) {
    case FibreHeroOption.INCOGNITO_JOURNEY:
      heroOption = FibreHeroOption.INCOGNITO_JOURNEY;
      break;
    case FibreHeroOption.COVERAGE_SEARCH_JOURNEY:
      heroOption = FibreHeroOption.COVERAGE_SEARCH_JOURNEY;
      break;
    case FibreHeroOption.INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY:
      heroOption = FibreHeroOption.INCOGNITO_AND_COVERAGE_SEARCH_JOURNEY;
      break;
    case FibreHeroOption.NOT_APPLICABLE:
      heroOption = FibreHeroOption.INCOGNITO_JOURNEY;
      break;
    default:
      heroOption = FibreHeroOption.COVERAGE_SEARCH_JOURNEY;
  }

  const urlData = <IFibreProductUrlType>{
    type: 'fibre',
    campaignCode: campaign?.code,
    productCode: productCode,
    promoCode: promo?.promoCode,
    friendlyName: friendlyName,
    productName,
    productDisplayName,
    downloadSpeedParam,
    downloadSpeedMbps,
    uploadSpeedParam,
    uploadSpeedMbps,
    displayPrice,
    productRate,
    productDisplayPrice,
    productChargePeriod,
    throttledStatus,
    cappedStatus,
    provider: provider.name,
  };

  const url = generateFibreProductUrls(urlData);
  // console.log("PromoCode: ", item.promoCode)
  // console.log("ProductCode: ", item.productCode)
  const newUrl = urls.find((i) => i.productCode === item.productCode && i.promoCode === promo.promoCode)?.productUrl;

  if (!url || !newUrl) {
    console.warn(`${productCode}: Skipping product with invalid urls`);
    return null;
  }

  //console.log(urlData)

  // console.log(
  //   "%c ======== FIBRE PRODUCT URLS ========",
  //   "color: pink; font-weight: 900"
  // );
  //console.log(urlData);
  // console.log(
  //   "%c ======== FIBRE GENERATED URL ========",
  //   "color: pink; font-weight: 900"
  // );
  // console.log(url);

  // old url for NG App redirect
  //const url = urls.length > 0 ? urls[0].oldProductUrl : "";
  // console.log("==== Fibre product Urls ====", url);

  // const url = `/fibre/${
  //   provider.productUrlSlug
  // }/${cappedStatus.toLowerCase()}-${downloadSpeedMbps}mbps-download-${uploadSpeedMbps}mbps-upload`;

  if (!productDisplayPrice) {
    console.warn(`${productCode}: Skipping product with invalid display price ${productDisplayPrice}`);
    return null;
  }

  return {
    providerName: provider?.name,
    campaignCode: campaign.code,
    campaignName: promo.promoCodeTagLine, //campaign.name,
    promoCode: promo.promoCode,
    coverageStatusOptionKey: promo.coverageStatusOptionKey,
    coverageStatusDisplayValue: promo.coverageStatusDisplayValue,
    promoCodeCategory: promo.promoCodeCategory,
    promoCodeSubcategory: promo.promoCodeSubcategory,
    providerCode: provider.code,
    coverageCode: provider.coverageCode,
    productCode,
    productDisplayName,
    productDisplayPrice,
    productChargePeriod,
    downloadSpeedMbps,
    uploadSpeedMbps,
    cappedStatus,
    throttledStatus,
    isHero,
    heroTagline,
    heroImage,
    heroOption,
    url,
    newUrl,
    hasPreProduct: item?.hasPreProduct,
    preProduct: item?.preProduct,
    tagLine: item?.tagLine,
    promoUrlSlug: promo?.promoUrlSlug,
    promoProductTagline: promo?.promoProductTagline,
    promoProductDescription: promo?.promoProductDescription,
  };
}

function convertResponseItemToPromo(item: any): IFibrePromo | null {
  if (!isObject(item)) {
    return null;
  }

  const promoUs = getString(item?.promoUrlSlug);
  const promoPT = getString(item?.promoProductTagline);
  const promoPD = getString(item?.promoProductDescription);

  const promoCode = getString(item?.promoCode);
  const promoCodeTagLine = getString(item?.promoCodeTagLine);
  const promoCodeDescription = getString(item?.promoCodeDescription);
  const promoCodeCategory = getString(item?.promoCodeCategory);
  const promoCodeSubcategory = getString(item?.promoCodeSubcategory);
  const coverageStatusOptionKey = getString(item?.coverageStatusOptionKey);
  const coverageStatusDisplayValue = getString(item?.coverageStatusDisplayValue);
  const promoUrlSlug = promoUs !== null ? promoUs : '';
  const promoProductTagline = promoPT !== null ? promoPT : '';
  const promoProductDescription = promoPD !== null ? promoPD : '';

  return {
    promoCode,
    promoCodeTagLine,
    promoCodeDescription,
    promoCodeCategory,
    promoCodeSubcategory,
    coverageStatusOptionKey,
    coverageStatusDisplayValue,
    promoUrlSlug,
    promoProductTagline,
    promoProductDescription,
  };
}

function useFibreProducts(): IUseFibreProducts {
  const { data, error } = useSWR(CampaignCategory.FIBRE, getFibreProducts);

  const campaigns = data ? data.campaigns : [];
  const products = data ? data.products : [];

  return {
    campaigns,
    products,
    loading: !error && !data,
    error: error,
  };
}

function getProductSpeedFromProductParams(product: any, paramName: string): number {
  const speed = product?.parameters?.find((p: any) => p.name === paramName);

  let value = 0;

  if (speed) {
    let con = convertKbpsToMbps(speed.value);
    value = con !== null ? con : 0;
  }

  return value;
}

function getFullProductSpeedFromProductParams(product: any, paramName: string): string {
  const speed = product?.parameters?.find((p: any) => p.name === paramName);

  let value = '';

  if (speed) {
    value = speedConverterPipe(speed.value);
  }

  return value;
}

function speedConverterPipe(speedKbps: string) {
  if (!speedKbps) {
    return '';
  }

  if (typeof speedKbps === 'string') {
    const value = Number(speedKbps.toLowerCase().replace('kbps', '').trim());

    let stepSize = 1024,
      decimalPlace = 2,
      sizes = ['Kbps', 'Mbps', 'Gbps', 'Tbps'],
      size = Math.floor(Math.log(value) / Math.log(stepSize));

    if (value >= 1024000) {
      size = 2;
    }

    return parseFloat((value / Math.pow(stepSize, size)).toFixed(decimalPlace)) + '' + sizes[size];
  }

  return '';
}

function getFibreProvidersWithProducts(providers: IFibreProvider[], products: IFibreProduct[]) {
  const providersNoProducts = new Set<string>();
  for (let provider of providers) {
    const providerProducts = products.filter((product) => product.providerCode === provider.code);
    if (providerProducts.length === 0) {
      providersNoProducts.add(provider.code);
    }
  }

  if (providersNoProducts.size > 0) {
    // console.warn('fibre providers with no products', providersNoProducts);
  }

  return providers.filter((provider) => !providersNoProducts.has(provider.code));
}

async function getProductsForCampaign(campaign: ICampaign): Promise<IFibreProduct[]> {
  const url = `${process.env.NEXT_PUBLIC_BAAS_BASE_URL}proxy/marketing/products/promos/${campaign.promocodes.join(',')}?sellable_online=true`;
  // console.log(`Fibre getProductsForCampaign: using url ${url}`);
  const response = await fetchFromServer(url);
  const data = await response.json();
  const productUrls = await getProductUrls();

  const products: IFibreProduct[] = [];
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

          //console.log("products: ", products)
          //console.log("Urls: ", urls)
        } catch (productError) {
          console.error(`error processing product for fibre promo code ${promo.promoCode}`, productError);
        }
      }
    } catch (promoError) {
      console.error(`error processing fibre promo code ${promoItem?.promoCode}`, promoError);
    }
  }
  return products;
}

async function getFibreProducts(channel: CampaignChannel = CampaignChannel.NEW_CUSTOMERS): Promise<IFibreProductData> {
  const { campaigns } = await getCampaigns({
    category: CampaignCategory.FIBRE,
    channel,
  });

  const productPromises = campaigns.filter((c) => c.isStandardCampaign || c.isDefaultCampaign).map((c) => getProductsForCampaign(c));
  const productResponses = await Promise.all(productPromises);
  const products = productResponses.flatMap((r) => r);

  //console.log("products responses", products);

  return { products, campaigns };
}

async function getPrivateFibreProducts(campaignCode: string): Promise<IFibreProductData> {
  const { campaigns } = await getPrivateCampaigns('fibre');

  const productPromises = campaigns
      .filter((c) => c.code === campaignCode)
      .map((c) => getProductsForCampaign(c));
  const productResponses = await Promise.all(productPromises);
  const products = productResponses.flatMap((r) => r);

  // console.log("======== Campaigns ========");
  // console.log(campaigns);

  // console.log("======== Filtered Campaigns ========");
  // console.log(campaigns.filter((c) => c.code === campaignCode));

  // console.log("======== Campaign Products ========");
  // console.log(products);

  return { products, campaigns };
}

export { getFibreProducts, getPrivateFibreProducts, useFibreProducts, getProductSpeedFromProductParams, getFibreProvidersWithProducts, getFullProductSpeedFromProductParams };

export type { FibreHeroOption, IFibreProduct, IFibrePromo, IFibreRecommendedProduct, IFibreUpsellProduct, IPreProduct };
