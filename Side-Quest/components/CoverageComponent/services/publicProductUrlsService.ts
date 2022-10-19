import { fetchFromServer } from '../utils/fetching';
import { IFibreProductUrlType, ILteProductUrlType } from '../utils/types';

async function getProductUrls() {
  const response = await fetchFromServer(`${process.env.NEXT_PUBLIC_PRODUCT_URLS}`);
  const data = await response.json();

  if (data) {
    let filteredProducts = data.filter(
      (product: any) => (product.productCategory.toLowerCase() === 'ftth' || product.productCategory.toLowerCase() === 'lte') && product.isAbTestUrl === false
    );

    const urls = filteredProducts.map((product: any) => {
      const { productCode, productUrl, promoCode, oldProductUrl, coverageStatusOptionKey } = product;
      return {
        productCode,
        promoCode,
        productUrl,
        oldProductUrl,
        coverageStatusOptionKey,
      };
    });

    if (urls) return urls;
  }

  return [];
}

function updateCleanUrlProviderName(providerName: string) {
  if (providerName.includes('metro')) return 'metrofibre';
  else if (providerName.includes('zoom')) return 'zoomfibre';
  else if (providerName.includes('clear')) return 'clearaccess';
  else return providerName;
}

function generateNewFibreProductUrl(urlData: IFibreProductUrlType): string {
  return `/fibre/${urlData.provider}/${urlData.cappedStatus}`;
}

// see: - https://observablehq.com/@mweb/product_urls
function generateFibreProductUrls(urlData: IFibreProductUrlType): string {
  const mbpsGbpsFriendly =
    urlData.downloadSpeedMbps >= 1024 ? `${Number(urlData.downloadSpeedMbps.toString().toLowerCase().replace('kbps', '').trim()) / 1024}gbps` : `${urlData.downloadSpeedMbps}mbps`;

  let providerName = urlData.provider.replace(/ /g, '-').toLowerCase();
  // FIX for MFN, Zoom and CA url
  providerName = updateCleanUrlProviderName(providerName); // providerName.replace("metro-fibre-networks", "metrofibre");

  const friendlyName = `${mbpsGbpsFriendly}-${urlData.cappedStatus.toLowerCase()}-${providerName}`;

  switch (urlData.type) {
    case 'fibre':
      return `/${urlData.type}/${friendlyName}/${urlData?.productCode?.toLowerCase()}/${urlData?.promoCode?.toLowerCase()}`;
    case 'lte':
      return '';
    default:
      return '';
  }
}

// see: - https://observablehq.com/@mweb/product_urls
function generateLteProductUrls(urlData: ILteProductUrlType): string {
  const gigabyteFriendly = urlData.standardCapParam?.value
    .replace('.0', '') // remove decimal
    .replace(/ /g, '')
    .toLowerCase();

  const providerName = urlData.promoCode.split('-');

  const friendlyName =
    urlData.cappedStatus.toLowerCase() === 'capped'
      ? `${gigabyteFriendly}-${urlData.cappedStatus.toLowerCase()}-${providerName.length > 0 ? providerName[1].toString().toLowerCase() : ''}`
      : `${urlData.productDisplayName.toLowerCase().replace(/ /g, '-')}-${providerName.length > 0 ? providerName[1].toString().toLowerCase() : ''}`;

  const promoCode = urlData?.promoCode.toLowerCase();
  // replace capped with cappedStatus variable
  // const promoCode = urlData?.promoCode.includes("CAPPED")
  //   ? urlData.promoCode.replace("CAPPED", urlData.cappedStatus.toLowerCase())
  //   : urlData?.promoCode.toLowerCase();

  switch (urlData.type) {
    case 'fibre':
      return '';
    case 'lte':
      return `/${urlData.type}/${friendlyName}/${urlData?.productCode?.toLowerCase()}/${promoCode.toLowerCase()}`;
    default:
      return '';
  }
}

export { getProductUrls, generateFibreProductUrls, generateNewFibreProductUrl, generateLteProductUrls };
