import { useEffect } from 'react';
import CoverageComponent from '../components/CoverageComponent';
import { ICampaign } from '../components/CoverageComponent/services/campaignsService';
import { getFibreProducts, getFibreProvidersWithProducts, IFibreProduct } from '../components/CoverageComponent/services/fibreProductService';
import { getLteProducts, getLteProvidersWithProducts, ILteProduct } from '../components/CoverageComponent/services/lteProductService';
import {
  fibreProviderOrderSelectList,
  fibreProviders,
  IFibreProvider,
  ILteProvider,
  lteProviderOrderSelectList,
  lteProviders,
  sortFibreProviders,
  sortLteProviders,
} from '../components/CoverageComponent/services/providerService';

interface iProps {
  fibreProducts: IFibreProduct[];
  fibreCampaigns: ICampaign[];
  fibreProviders: IFibreProvider[];
  lteProducts: ILteProduct[];
  lteProviders: ILteProvider[];
}

export default function Home(props: iProps) {
  const { fibreCampaigns, fibreProducts, fibreProviders, lteProducts, lteProviders } = props;

  useEffect(() => {}, [fibreCampaigns, fibreProducts, fibreProviders, lteProducts, lteProviders]);

  return (
    <CoverageComponent
      page='home'
      fibreCampaigns={fibreCampaigns}
      fibreProducts={fibreProducts}
      fibreProviders={fibreProviders}
      lteProducts={lteProducts}
      lteProviders={lteProviders}
    />
  );
}

export async function getStaticProps() {
  const fibreProductData = await getFibreProducts();
  const lteProductData = await getLteProducts();

  let fibreProvidersToUse = getFibreProvidersWithProducts(fibreProviders, fibreProductData.products);
  let lteProvidersToUse = getLteProvidersWithProducts(lteProviders, lteProductData.products);

  fibreProvidersToUse = sortFibreProviders(fibreProvidersToUse, fibreProviderOrderSelectList);
  lteProvidersToUse = sortLteProviders(lteProvidersToUse, lteProviderOrderSelectList);

  return {
    props: {
      fibreProducts: fibreProductData.products,
      fibreCampaigns: fibreProductData.campaigns,
      fibreProviders: fibreProvidersToUse,

      lteProducts: lteProductData.products,
      lteProviders: lteProvidersToUse,
    },
    revalidate: 300,
  };
}
