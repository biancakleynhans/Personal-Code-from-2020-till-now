export interface ICoverage {
  latitude: number;
  longitude: number;
  fibreProviders: IProviderStatus[];
  lteProviders: IProviderStatus[];
  adslProviders: IProviderStatus[];
  pureDSLProviders: IProviderStatus[];
  services: any[];
}

export interface IProviderStatus {
  code: string | null;
  status: string | null;
  locations: IProviderLocation[];
}

export interface IProviderLocation {
  premiseRef: string; // required
  premiseId: string; // required
  suburb: string; // required
  address: string; // required
  province: string | null;
  country: string | null;
  estateName: string | null;
  mduName: string | null;
  mduUnitNumber: string | null;
  networkReadinessStatus: string | null;
}
