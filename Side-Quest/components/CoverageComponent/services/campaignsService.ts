import useSWR from 'swr';
import { fetchFromServer } from '../utils/fetching';
import { getBooleanOrDefault, getString, isObject, isString } from '../utils/types';
import { getProductUrls } from './publicProductUrlsService';
import {ILtePromo, convertResponseItemToPromo, convertResponseItemToProduct} from "../../../services/lteProductsService";

enum CampaignCategory {
  DSL = 'dsl',
  FIBRE = 'fibre',
  CAPPED_HOSTING = 'cappedhosting',
  SECURITY = 'security',
  LTE = 'lte',
  MAILBOX = 'mailbox',
  OFFICE365 = 'office365',
  SVOD = 'svod',
  VOIP = 'voip',
  THREEG = '3g',
  HARDWARE = 'hardware',
  ANTIVIRUS = 'antivirus',
  KASPERSKY = 'kaspersky',
  STORE_HARDWARE = 'store-hardware',
  STORE_SOFTWARE = 'store-software',
  BIT_DEFENDER = 'bitdefender',
  DOMAINS = 'domains',
  NORTON = 'norton',
}

enum CampaignChannel {
  NEW_CUSTOMERS = '120',
  EXISTING_CUSTOMERS = '130',
  ALL_CUSTOMERS = '120,130',
}

interface ICampaign {
  code: string | null;
  name: string | null;
  description: string | null;
  urlSlug: string | null;
  category: string | null;
  isStandardCampaign: boolean;
  isDefaultCampaign: boolean;
  isPrivateCampaign: boolean;
  promocodes: string[];
}

interface IUseCampaign {
  campaigns: ICampaign[];
  loading: boolean;
  error: any;
}

interface ICampaignData {
  campaigns: ICampaign[];
}

interface IGetCampaignsParams {
  category: CampaignCategory;
  channel: CampaignChannel;
  subcategories?: string[];
}

function convertResponseItemToCampaign(item: any): ICampaign | null {
  if (!isObject(item)) {
    return null;
  }

  const code = getString(item?.code);
  const name = getString(item?.name);
  const description = getString(item?.description);
  const urlSlug = getString(item?.urlSlug);
  const category = getString(item?.category);
  const isStandardCampaign = getBooleanOrDefault(item?.isStandardCampaign);
  const isDefaultCampaign = getBooleanOrDefault(item?.isDefaultCampaign);
  const isPrivateCampaign = getBooleanOrDefault(item?.isPrivateCampaign);

  const promocodes = [];
  if (Array.isArray(item?.promocodes)) {
    for (const pc of item.promocodes) {
      if (isString(pc)) {
        promocodes.push(pc);
      }
    }
  } else {
    console.warn(`campaign ${code} promocode field is not an array`);
  }

  return {
    code,
    name,
    description,
    urlSlug,
    category,
    isStandardCampaign,
    isDefaultCampaign,
    isPrivateCampaign,
    promocodes,
  };
}

async function getCampaigns({ category, channel, subcategories }: IGetCampaignsParams): Promise<ICampaignData> {
  let url = `${process.env.NEXT_PUBLIC_BAAS_BASE_URL}proxy/marketing/campaigns/${category}?channels=${channel}&visibility=public`;
  //                                                 proxy/marketing/campaigns/lte        ?channels=120,130&page=campaign&visibility=private
  if (subcategories) {
    url = `${url}&subcategories=${subcategories.join(',')}`;
  }

  // console.log(`getting campaigns: url = ${url}`);
  const response = await fetchFromServer(url);

  const { campaigns: data, errors } = await response.json();

  if (errors) {
    return { campaigns: [] };
  }

  if (response.ok) {
    if (!Array.isArray(data)) {
      // console.log('No Campaign Data');
      return Promise.reject('response data is not an array of campaigns');
    }

    let campaigns: ICampaign[] = [];
    for (const item of data) {
      const campaign = convertResponseItemToCampaign(item);
      if (campaign) {
        campaigns.push(campaign);
      }
    }

    return { campaigns };
  } else {
    const error = new Error(errors?.map((e: any) => e.message).join('\n') ?? 'unknown');
    return Promise.reject(error);
  }
}

async function getPrivateCampaigns(type: 'lte' | 'fibre'): Promise<ICampaignData> {
  let url = `${process.env.NEXT_PUBLIC_BAAS_BASE_URL}proxy/marketing/campaigns/${type}?channels=120,130&page=campaign&visibility=private`;

  // console.log(`getting prvate campaigns: url = ${url}`);
  const response = await fetchFromServer(url);

  const { campaigns: data, errors } = await response.json();

  if (errors) {
    return { campaigns: [] };
  }

  if (response.ok) {
    if (!Array.isArray(data)) {
      // console.log('No Campaign Data');
      return Promise.reject('response data is not an array of campaigns');
    }

    let campaigns: ICampaign[] = [];
    for (const item of data) {
      // console.log('%c CAMPAIGN', 'color:red', item);
      const campaign = convertResponseItemToCampaign(item);
      if (campaign) {
        campaigns.push(campaign);
      }
    }

    return { campaigns };
  } else {
    const error = new Error(errors?.map((e: any) => e.message).join('\n') ?? 'unknown');
    return Promise.reject(error);
  }
}

function useCampaigns({ category, channel }: IGetCampaignsParams): IUseCampaign {
  async function fetcher(key: string) {
    return getCampaigns({ category, channel });
  }

  const { data, error } = useSWR(`${category}-${channel}`, fetcher);

  const campaigns = data !== undefined ? data.campaigns : [];
  return {
    campaigns,
    loading: !error && !campaigns,
    error: error,
  };
}

async function getProductsForPromoCampaign(campaign: ICampaign): Promise<any[]> {
  let url = `${process.env.NEXT_PUBLIC_BAAS_BASE_URL}proxy/marketing/products/promos/${campaign.promocodes.join(',')}?sellable_online=true`;
  let response = await fetchFromServer(url);
  let data = await response.json();
  let products: any[] = [];
  let productUrls = await getProductUrls();

  // console.log(`getProductsForCampaign: using url ${url}`);
  // console.log("Products for promo's", data);

  for (const promoItem of data) {
    try {
      // console.log('Promo Products', promoItem.products);
      products = [...products, ...promoItem.products];
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

  return Promise.resolve(products);
}

export { getCampaigns, getPrivateCampaigns, getProductsForPromoCampaign, useCampaigns, CampaignCategory, CampaignChannel };
export type { ICampaign, ICampaignData };
