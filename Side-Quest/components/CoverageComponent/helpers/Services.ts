import { IProviderStatus } from '../interfaces/Coverage';

const REGEX_PLANNED_STATUS = /(.*progress|planned)/gi;
const REGEX_LIVE_STATUS = /(.*live)/gi;
const REGEX_COVERAGE_PROMO_LIVE = /^(promo).*(-live)$/;
const REGEX_COVERAGE_PROMO_AMBER = /^(promo).*(-inprogress)$/;

function isLive(status: string): boolean {
  return status.match(REGEX_LIVE_STATUS) !== null;
}

function isPlanned(status: string): boolean {
  return status.match(REGEX_PLANNED_STATUS) !== null;
}

function isPromoLive(status: string): boolean {
  return status.match(REGEX_COVERAGE_PROMO_LIVE) !== null;
}

function isPromoAmber(status: string): boolean {
  return status.match(REGEX_COVERAGE_PROMO_AMBER) !== null;
}

function hasVumaReachFibre(FibreProviders: IProviderStatus[]): boolean {
  if (FibreProviders.length === 0) {
    return false;
  }

  return FibreProviders.find((p) => p.code === 'vumatelreach' && (isLive(p.status !== null ? p.status : '') || isPlanned(p.status !== null ? p.status : ''))) ? true : false;
}

export { isLive, isPlanned, isPromoAmber, isPromoLive, hasVumaReachFibre };
