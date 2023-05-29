import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GroupedCards from '../../components/e-comms/products/GroupedCards';
import ProductInfoDisplay from '../../components/e-comms/products/ProductInfoDisplay';
import TypeIntroBar from '../../components/e-comms/products/TypeIntroBar';
import { iBreadcrumb } from '../../components/shared/reusable/BreadCrumbs';
import { useProductsData } from '../../context/ProductsContext';
import { iProduct } from '../../models/Products';

const loren =
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus eius vero possimus optio exercitationem velit asperiores aspernatur labore est quod aliquid veniam, nisi nihil adipisci quam minima quos nemo expedita.';

function sortArrayAlphabetically(arr: any[]) {
  let clone = arr;
  clone.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return clone;
}
export default function OnlineShopPage() {
  const router = useRouter();
  const { inventory, categories, subcategories } = useProductsData();

  const [urlString, seturlString] = useState<string>('');
  const [curr, setcurr] = useState<string>('');
  const [isProduct, setisProduct] = useState<boolean>(false);
  const [pid, setpid] = useState<string>('');
  const [topFilter, settopFilter] = useState<string>('Newest');
  const [showSideFilters, setshowSideFilters] = useState(false);
  const [col, setcol] = useState<string>('3');

  const [arrToDisplay, setarrToDisplay] = useState<iProduct[]>([]);
  const [breadCrumbs, setbreadCrumbs] = useState<iBreadcrumb[]>([]);
  const [descDisplay, setdescDisplay] = useState('');

  useEffect(() => {
    if (router.query.info !== undefined) {
      if (typeof router.query.info === 'string') {
        seturlString(router.query.info);
      } else {
        // console.log('Props OnlineShopPage', router.query.info, router.query.info.join(','), router.query.pid, router.query.isProduct);
        let use = router.query.info.join(',').replaceAll(',', '/');
        let sub = use.split('/');
        seturlString(use);
        setcurr(sub[sub.length - 1]);

        if (typeof router.query.isProduct === 'string') {
          // console.log('is it???', router.query.isProduct);
          setisProduct(true);
          if (router.query.pid && typeof router.query.pid === 'string') {
            setpid(router.query.pid);
          }
        } else {
          setisProduct(false);
        }
      }
    }
  }, [router.query.info]);

  useEffect(() => {
    let pathString = router.pathname.replace('[...info]', urlString);

    let arr: string[] = pathString
      .split('/')
      .filter((x) => x.length > 0)
      .filter((x) => x !== 'shop');

    let paths: { name: string; path: string }[] = arr.map((x, i) => (i > 0 ? { name: x, path: `/shop/${arr[0]}/${x}` } : { name: x, path: `/shop/${x}` }));
    let use: { name: string; path: string }[] = [];
    use.push({ name: 'Home', path: '/' });
    use = [...use, ...paths];

    setbreadCrumbs(use);

    // console.log('Path', pathString, paths, use);
  }, [router.pathname, urlString]);

  useEffect(() => {
    if (inventory.length > 0) {
      if (!isProduct) {
        if (curr.toLowerCase() !== 'sale' && curr.toLowerCase() !== 'offer') {
          let cats = inventory.filter((x) => x.category === curr);
          let subcats = inventory.filter((x) => x.subcategory === curr);
          let use = [...cats, ...subcats];
          let final = sortArrayAlphabetically(use);
          // console.log('WHAT to display', isProduct, curr, use, final);

          let dc = categories.filter((x) => x.name.toLowerCase() === curr.toLowerCase());
          let ds = categories.filter((x) => x.name.toLowerCase() === curr.toLowerCase());

          let find = [...dc, ...ds];
          // console.log('????', find[0].desc);

          if (find[0]?.desc !== undefined) {
            setdescDisplay(find[0].desc);
          } else {
            setdescDisplay(loren);
          }

          setarrToDisplay(final);
        } else {
          if (curr.toLowerCase() === 'sale') {
            let arr = inventory.filter((x) => x.isOnSale);
            let final = sortArrayAlphabetically(arr);
            // console.log('WHAT to display', isProduct, curr, arr, final);
            setarrToDisplay(final);
          } else if (curr.toLowerCase() === 'offer') {
            setarrToDisplay([]);
          } else {
            setarrToDisplay([]);
          }
        }
      } else {
        let productArr: iProduct[] = inventory.filter((x) => x.id === pid);
        // console.log('Product display', isProduct, productArr);
        setarrToDisplay(productArr);
      }
    }
  }, [curr, isProduct, inventory]);

  useEffect(() => {}, [topFilter, showSideFilters, col, breadCrumbs]);

  function FilterBar() {
    return <div className='w-full my-4 '>Filter bar</div>;
  }

  const CatSubCatDisplay = () => {
    return (
      <>
        <TypeIntroBar
          // uncomment boolean button when wanting to use filter button it lives here
          description={descDisplay}
          title={curr}
          breadCrumbs={breadCrumbs}
          colCount={col}
          handlecolCount={(count) => setcol(count)}
          displaySidefilterBtn={showSideFilters}
          handleSidefilter={(v) => setshowSideFilters(v)}
          displayTopfilterBtn={topFilter}
          handleTopfilter={(v) => settopFilter(v)}
        />
        <div className='flex flex-col justify-between'>
          {showSideFilters && FilterBar()}
          <GroupedCards arrToDisplay={arrToDisplay} colCount={col} />
        </div>
      </>
    );
  };

  return <div>{!isProduct ? <CatSubCatDisplay /> : <ProductInfoDisplay breadCrumbs={breadCrumbs} product={arrToDisplay[0]} />}</div>;
}
