export enum ServiceType {
  FIBRE = 'fibre',
  LTE = 'lte',
  ADSL = 'dsl',
  PUREDSL = 'pureconnect',
}

export interface IServiceEntry {
  providers: { provider: string; status: string };
  type: ServiceType;
}
