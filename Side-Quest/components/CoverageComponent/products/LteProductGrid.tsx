import { useEffect, useState } from 'react';
import { IProduct } from '../coverage/ProductsCompomnent';
import LteCategoryCard from './LteCategoryCard';

interface iProps {
  products: any[];
  intLoadMore: number;
  buttonText: string;
  hasCoverageSearchResults: boolean;
  page: string;

  onLinkWrapperClick: () => void;
  typeDisplay: string;
  providers: any[];
  providersStats: any[];
  productButtonText: string;
  overRideForProductClicked: () => void;
  useOverRideFunc: boolean;
}
export default function LteProductsGrid(props: iProps) {
  const { hasCoverageSearchResults, intLoadMore, page, products, providers, typeDisplay, providersStats, productButtonText, useOverRideFunc, overRideForProductClicked } = props;

  const [visible, setVisible] = useState(intLoadMore);
  const [itemsLength, setItemsLength] = useState(0);

  useEffect(() => {
    // console.log('we have products', hasCoverageSearchResults, products);
    setItemsLength(products.length);
  }, [products, hasCoverageSearchResults]);

  const loadMore = () => {
    let nextVisible = visible;
    const remainder = itemsLength % nextVisible;
    // console.log(remainder, visible, itemsLength, nextVisible);
    if (remainder < itemsLength) {
      nextVisible += intLoadMore;
      setVisible(nextVisible);
    }
  };

  return (
    <>
      {products.length === 0 && (
        <div className='text-mwgray-d py-14 text-center'>
          <h5>Please review your selections. There are no products available that meet your selection.</h5>
        </div>
      )}
      <div
        className={`${products.length === 0 ? 'hidden' : ''} w-full max-w-xl md:max-w-6xl m-auto flex ${products.length === 1 ? 'justify-center' : ''} flex-wrap px-2 py-4 md:px-0`}
      >
        {products.slice(0, visible).map((p, i) => (
          <LteCategoryCard
            key={i}
            hasCoverageSearchResults={hasCoverageSearchResults}
            page={page}
            product={p}
            // provider={providers.filter((x: any) => x.code === p.providerCode)[0]}
            // console.log('????? ', x.code, p.subcategory.toLowerCase(), p.providerCode)
            provider={providers.filter((x: any) => x.code === p?.providerCode || x.code === p?.subcategory?.toLowerCase())[0]}
            typeDisplay={typeDisplay}
            providersStats={providersStats}
            overRideForProductClicked={overRideForProductClicked}
            productButtonText={productButtonText}
            useOverRideFunc={useOverRideFunc}
          />
        ))}
      </div>
      {visible < itemsLength && (
        <div className='flex justify-center items-center pb-10'>
          <button className='border border-mwgrey px-4 py-2 text-mwgrey' onClick={loadMore}>
            Load More +
          </button>
        </div>
      )}
    </>
  );
}
