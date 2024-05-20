import { useProduct } from '../features/product/useProduct';
import ProductDetail from '../features/product/ProductDetail';
import SpinnerFull from '../ui/SpinnerFull';
import ErrorPage from '../ui/ErrorPage';

function Product() {
  const { isLoading, product, error, refetch } = useProduct();

  if (isLoading) return <SpinnerFull />;
  if (error) return <ErrorPage refetch={refetch} type="full" />;

  return <ProductDetail product={product} />;
}

export default Product;
