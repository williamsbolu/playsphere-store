import ProductTable from '../features/product/ProductTable';

function HotDeals() {
  return (
    <ProductTable params="offers=hot-deals" pageContentHeader="Hot Deals" />
  );
}

export default HotDeals;
