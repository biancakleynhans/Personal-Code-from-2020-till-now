interface IFibreProvider {
  code: string;
  name: string;
  productSubcat: string;
  logoUrl: string;
  productUrlSlug: string;
  coverageCode: string;
  active: boolean;
}

interface ILteProvider {
  code: string;
  name: string;
  productSubcat: string;
  logoUrl: string;
  active: boolean;
  productUrlSlug: string;
  coverageCode: string;
}

const fibreProviders: IFibreProvider[] = [
  {
    code: 'centurycity',
    name: 'Century City Connect',
    productSubcat: 'Century City Connect',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-century.png`,
    active: true,
    productUrlSlug: 'century-city-connect',
    coverageCode: 'centurycity',
  },
  {
    code: 'evotel',
    name: 'Evotel',
    productSubcat: 'Evotel',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-evotel.png`,
    active: true,
    productUrlSlug: 'evotel',
    coverageCode: 'evotel',
  },
  {
    code: 'octotel',
    name: 'Octotel',
    productSubcat: 'Octotel',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-octotel.png`,
    active: true,
    productUrlSlug: 'octotel',
    coverageCode: 'octotel',
  },
  {
    code: 'vumatel',
    name: 'Vumatel',
    productSubcat: 'Vumatel',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-vuma-core-67x40.png`,
    active: true,
    productUrlSlug: 'vumatel',
    coverageCode: 'vumatelcore',
  },
  {
    code: 'openserve',
    name: 'Openserve',
    productSubcat: 'OpenServe',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-openserve.png`,
    active: true,
    productUrlSlug: 'openserve',
    coverageCode: 'openserve',
  },
  {
    code: 'frogfoot',
    name: 'Frogfoot',
    productSubcat: 'Frogfoot',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-frogfoot.png`,
    active: true,
    productUrlSlug: 'frogfoot',
    coverageCode: 'frogfoot',
  },
  {
    code: 'mfn',
    name: 'Metro Fibre Networks',
    productSubcat: 'MFN',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-metrofibre.png`,
    active: true,
    productUrlSlug: 'metrofibre',
    coverageCode: 'metrofibre',
  },
  {
    code: 'vodacom',
    name: 'Vodacom',
    productSubcat: 'Vodacom',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-vodacom.png`,
    active: true,
    productUrlSlug: 'vodacom',
    coverageCode: 'vodacom',
  },
  {
    code: 'linkafrica',
    name: 'Link Africa',
    productSubcat: 'Link Africa',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-linkafrica.png`,
    active: true,
    productUrlSlug: 'link-africa',
    coverageCode: 'linkafrica',
  },
  {
    code: 'linklayer',
    name: 'Link Layer',
    productSubcat: 'Link Layer',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-link-layer.png`,
    active: true,
    productUrlSlug: 'link-layer',
    coverageCode: 'linklayer',
  },
  {
    code: 'lightstruck',
    name: 'Lightstruck',
    productSubcat: 'Lightstruck',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-lightstruck.png`,
    active: true,
    productUrlSlug: 'lightstruck',
    coverageCode: 'lightstruck',
  },
  {
    code: 'vumareach',
    name: 'Vuma Reach',
    productSubcat: 'Vuma Reach',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-vuma-reach-67x40.png`,
    active: true,
    productUrlSlug: 'vuma-reach',
    coverageCode: 'vumatelreach',
  },
  {
    code: 'ttconnect',
    name: 'TT Connect',
    productSubcat: 'TT Connect',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-tt-connect.png`,
    active: true,
    productUrlSlug: 'tt-connect',
    coverageCode: 'ttconnect',
  },
  {
    code: 'zoomfibre',
    name: 'Zoom Fibre',
    productSubcat: 'ZoomFibre',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-zoom-fibre.png`,
    active: true,
    productUrlSlug: 'zoomfibre',
    coverageCode: 'zoomfibre',
  },
  {
    code: 'clearaccess',
    name: 'Clear Access',
    productSubcat: 'ClearAccess',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-clear-access.png`,
    active: true,
    productUrlSlug: 'clearaccess',
    coverageCode: 'clearaccess',
  },
  {
    code: 'openservewebconnect',
    name: 'Web Connect',
    productSubcat: 'Web Connect',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-openserve-web-connect.png`,
    active: true,
    productUrlSlug: 'web-connect',
    coverageCode: 'openservewebconnect',
  },
  {
    code: 'frogfootair',
    name: 'Frogfoot Air',
    productSubcat: 'Frogfoot Air',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-frogfootair.png`,
    active: true,
    productUrlSlug: 'frogfootair',
    coverageCode: 'frogfootair',
  },
];

const fibreProviderOrderSelectList = [
  'openserve',
  'openservewebconnect',
  'vumatel',
  'octotel',
  'frogfoot',
  'vumareach',
  'mfn',
  'evotel',
  'vodacom',
  'linkafrica',
  'linklayer',
  'lightstruck',
  'ttconnect',
  'centurycity',
  'zoomfibre',
  'clearaccess',
  'frogfootair',
];

const lteProviders: ILteProvider[] = [
  {
    code: 'telkom',
    name: 'Telkom',
    productSubcat: 'Telkom',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-telkom.png`,
    active: true,
    productUrlSlug: 'telkom',
    coverageCode: 'telkom',
  },
  {
    code: 'mtn',
    name: 'MTN',
    productSubcat: 'MTN',
    logoUrl: `${process.env.NEXT_PUBLIC_LOGO_BASE_URL}/provider-mtn.png`,
    active: true,
    productUrlSlug: 'mtn',
    coverageCode: 'mtn',
  },
];

const lteProviderOrderSelectList = ['mtn', 'telkom'];

function sortFibreProviders(providers: IFibreProvider[], sortOrder: string[], excludeMissing: boolean = true): IFibreProvider[] {
  const sortedProviders = excludeMissing ? providers.filter((p) => sortOrder.includes(p.code)) : [...providers];

  sortedProviders.sort((p1, p2) => {
    const p1Order = sortOrder.findIndex((providerCode) => providerCode === p1.code);
    const p2Order = sortOrder.findIndex((providerCode) => providerCode === p2.code);
    return p1Order - p2Order;
  });

  return sortedProviders;
}

function sortLteProviders(providers: ILteProvider[], sortOrder: string[], excludeMissing: boolean = true): ILteProvider[] {
  const sortedProviders = excludeMissing ? providers.filter((p) => sortOrder.includes(p.code)) : [...providers];

  sortedProviders.sort((p1, p2) => {
    const p1Order = sortOrder.findIndex((providerCode) => providerCode === p1.code);
    const p2Order = sortOrder.findIndex((providerCode) => providerCode === p2.code);
    return p1Order - p2Order;
  });

  return sortedProviders;
}

export { lteProviders };
export type { ILteProvider };

export { fibreProviders, fibreProviderOrderSelectList, sortFibreProviders, sortLteProviders, lteProviderOrderSelectList };
export type { IFibreProvider };
