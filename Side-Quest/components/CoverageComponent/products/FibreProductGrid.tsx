import { useEffect, useState } from 'react';
import { IProduct } from '../coverage/ProductsCompomnent';
import FibreCategoryCard from './FibreCategoryCard';

const Heading = ({ typeDisplay }: { typeDisplay: string }) => {
  return typeDisplay === 'lte' ? (
    <h1 className='text-2xl font-bold text-gray-700'>
      Choose a <span className='uppercase'>{typeDisplay}</span> Package:
    </h1>
  ) : null;
};

interface iProps {
  fibreServices: any[];
  products: IProduct[];
  intLoadMore: number;
  buttonText: string;
  hasCoverageSearchResults: boolean;
  page: string;
  typeDisplay: string;
  onLinkWrapperClick: () => void;
  providersStats: any[];
  productButtonText: string;
  overRideForProductClicked: () => void;
  useOverRideFunc: boolean;
}

export default function FibreProductGrid(props: iProps) {
  const { fibreServices, intLoadMore, products, typeDisplay, hasCoverageSearchResults, page, providersStats, productButtonText, useOverRideFunc, overRideForProductClicked } =
    props;

  const [visible, setVisible] = useState<number>(intLoadMore);
  const [itemsLength, setItemsLength] = useState<number>(0);

  useEffect(() => {
    if (products && products.length > 0) {
      // console.log('%c == FIBRE PRODUCT GRID ==', 'color: violet; font-weight: 900');
      // console.log(products);
      setItemsLength(products.length);
    }
  }, [products]);

  useEffect(() => {}, [fibreServices, typeDisplay, hasCoverageSearchResults, page]);

  function loadMore() {
    let nextVisible = visible;
    const remainder = itemsLength % nextVisible;
    if (remainder < itemsLength) {
      nextVisible += intLoadMore;
      setVisible(nextVisible);
    }
  }

  function DisplayProducts() {
    let display = products.slice(0, visible);
    let isShow = products.length === 0 ? 'hidden' : '';
    let isCenter = products.length === 1 ? 'justify-center' : '';
    let style = 'w-full max-w-xl md:max-w-6xl m-auto  px-2 py-4 md:px-0';

    return (
      <div className={`${isShow} ${style} flex ${isCenter} flex-wrap`}>
        {display.map((p, i) => {
          let provider = fibreServices.filter((s) => s.coverageCode === p.coverageCode)[0];

          return (
            <FibreCategoryCard
              key={i}
              providersStats={providersStats}
              product={p}
              provider={provider}
              typeDisplay={typeDisplay}
              hasCoverageSearchResults={hasCoverageSearchResults}
              page={page}
              productButtonText={productButtonText}
              overRideForProductClicked={overRideForProductClicked}
              useOverRideFunc={useOverRideFunc}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      <Heading typeDisplay={typeDisplay} />

      {/* No products */}
      {products.length === 0 && (
        <div className='text-mwgray-d py-14 text-center'>
          <h5>Please review your selections. There are no products available that meet your selection.</h5>
        </div>
      )}

      {products.length > 0 && DisplayProducts()}

      {/* more products to view */}
      {visible < itemsLength && (
        <div className='flex justify-center items-center pb-10'>
          <button className='border border-mwgrey px-4 py-2 text-mwgrey' onClick={() => loadMore()}>
            Load More +
          </button>
        </div>
      )}
    </>
  );
}
