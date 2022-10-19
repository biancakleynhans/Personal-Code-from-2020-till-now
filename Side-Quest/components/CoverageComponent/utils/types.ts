interface INumberRange {
  key: string;
  label: string;
  min: number;
  max: number;
}

interface IFibreCampaignCodes {
  key: string;
  label: string;
}

interface IFibreDealType {
  key: string;
  label: string;
}

interface ILteCampaignCodes {
  key: string;
  label: string;
}

interface ILteDealType {
  key: string;
  label: string;
}

interface IFibreProductUrlType {
  type: string | '';
  ProviderNam: string;
  campaignCode: string | '';
  productCode: string | '';
  promoCode: string | '';
  friendlyName: string | '';
  productName: string | '';
  productDisplayName: string | '';
  downloadSpeedParam: any | null;
  downloadSpeedMbps: number | 0;
  uploadSpeedParam: any | null;
  uploadSpeedMbps: any | null;
  displayPrice: number | 0;
  productRate: number | 0;
  productDisplayPrice: number | 0;
  productChargePeriod: string | '';
  throttledStatus: string | '';
  cappedStatus: string | '';
  provider: string | '';
}

interface ILteProductUrlType {
  type: string | '';
  campaignCode: string | '';
  productCode: string | '';
  promoCode: string | '';
  friendlyName: string | '';
  productName: string | '';
  productDisplayName: string | '';
  displayPrice: number | 0;
  productRate: number | 0;
  productDisplayPrice: number | 0;
  productChargePeriod: string | '';
  standardCapParam: any | null;
  standardCapGB: number | 0;
  nighttimeCapParam: any | null;
  nighttimeCapGB: number | 0;
  cappedStatus: string | '';
  itemHasTeraByteValue?: boolean;
}

type UpdateSelectedMultipleFunction = (item: any, selected: boolean, isChecked: boolean) => void;
type UpdateSelectedFunction = (item: any, selected: boolean) => void;

function isObject(value: unknown): value is Object {
  return typeof value === 'object';
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function getString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function getStringOrDefault(value: unknown, defaultValue: string = ''): string {
  return getString(value) ?? defaultValue;
}

function getBoolean(value: unknown): boolean | null {
  return typeof value === 'boolean' ? value : null;
}

function getBooleanOrDefault(value: unknown, defaultValue: boolean = false): boolean {
  return getBoolean(value) ?? defaultValue;
}

function getNumber(value: unknown): number | null {
  return typeof value === 'number' ? value : null;
}

function getNumberOrDefault(value: unknown, defaultValue: number): number {
  return typeof value === 'number' ? value : defaultValue;
}

export { isObject, isString, getString, getStringOrDefault, getBoolean, getBooleanOrDefault, getNumber, getNumberOrDefault };

export type {
  INumberRange,
  IFibreCampaignCodes,
  IFibreDealType,
  ILteCampaignCodes,
  ILteDealType,
  IFibreProductUrlType,
  ILteProductUrlType,
  UpdateSelectedMultipleFunction,
  UpdateSelectedFunction,
};
