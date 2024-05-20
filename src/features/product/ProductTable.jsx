import { useProducts } from './useProducts';
import ErrorPage from '../../ui/ErrorPage';
import SpinnerFull from '../../ui/SpinnerFull';
import ProductListComplete from './ProductListComplete';

function ProductTable({ params, pageContentHeader }) {
  const { isLoading, products, error, count, refetch } = useProducts(params);

  if (isLoading) return <SpinnerFull />;
  if (error) return <ErrorPage refetch={refetch} type="full" />;

  return (
    <ProductListComplete
      productData={products.data}
      count={count}
      pageContentHeader={pageContentHeader}
    />
  );
}

export default ProductTable;
