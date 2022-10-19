import { IProviderLocation } from '../interfaces/Coverage';
import { getString } from '../utils/types';

export function parseProviderLocation(item: any): IProviderLocation | null {
  const premiseRef = getString(item?.premise_ref_isp);
  if (!premiseRef) {
    console.warn('provider location result does not contain premise_ref_isp, skipping');
    return null;
  }

  const premiseId = getString(item?.premisesid);
  if (!premiseId) {
    console.warn('provider location result does not contain premiseid, skipping');
    return null;
  }

  const suburb = getString(item?.suburb);
  if (!suburb) {
    console.warn('provider location result does not contain suburb, skipping');
    return null;
  }

  const address = getString(item?.address);
  if (!address) {
    console.warn('provider location result does not contain address, skipping');
    return null;
  }

  const province = getString(item?.province);
  const country = getString(item?.country);
  const estateName = getString(item?.estate_name);
  const mduName = getString(item?.mdu_name);
  const mduUnitNumber = getString(item?.mdu_unitno);
  const networkReadinessStatus = getString(item?.network_readiness_status);

  return {
    premiseRef,
    premiseId,
    suburb,
    address,
    province,
    country,
    estateName,
    mduName,
    mduUnitNumber,
    networkReadinessStatus,
  };
}
