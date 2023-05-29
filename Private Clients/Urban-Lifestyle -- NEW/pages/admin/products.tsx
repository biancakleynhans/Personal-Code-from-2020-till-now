import React, { useEffect, useState } from 'react';
import GridedProducts from '../../components/layouts/GriddedProducts';
import { useProductsData } from '../../context/ProductsContext';
import { iProduct } from '../../models/Products';

const defaultProduct: iProduct = {
  id: '',
  name: '',
  desc: '',
  size: '',
  color: '',
  priceRaw: 0,
  priceSell: 0,
  markupPercentage: 0,
  discountPercentage: 0,
  stock: 0,
  images: [],
  category: '',
  subcategory: '',
  rating: 0,
  brand: '',
  dateCreated: new Date(),
  isOnSale: false,
};

export default function Products() {
  const { inventory, CreateNew, UpdateProduct } = useProductsData();

  useEffect(() => {
    // console.log('inventory', inventory);
  }, [inventory]);

  return (
    <GridedProducts
      defaultObject={defaultProduct}
      displayArr={inventory}
      onAdd={(item) => CreateNew(item, 'inventory')}
      onDelete={() => {}}
      onEdit={(item) => UpdateProduct(item)}
      header='Products'
    />
  );
}
