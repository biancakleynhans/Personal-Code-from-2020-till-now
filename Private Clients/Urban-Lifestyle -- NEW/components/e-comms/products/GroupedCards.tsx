import { useEffect, useState } from 'react';
import { iProduct } from '../../../models/Products';
import ProductCardDisplay from './ProductCardDisplay';

interface iProps {
  colCount: string;

  arrToDisplay: iProduct[];
}

export default function GroupedCards(props: iProps) {
  const { arrToDisplay, colCount } = props;

  const [colSAtring, setcolSAtring] = useState<string>('grid grid-cols-2 gap-4');

  useEffect(() => {
    let col = `grid grid-cols-${colCount} gap-4`;
    // console.log('col count changed', colCount, col);
    setcolSAtring(col);
  }, [colCount]);
  useEffect(() => {}, [arrToDisplay]);

  return (
    <div className={`w-[99%] ml-2 mr-2 ${colSAtring} cursor-pointer`}>
      {arrToDisplay.map((x, i) => (
        <ProductCardDisplay key={i} product={x} />
      ))}
    </div>
  );
}
