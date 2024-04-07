import { useProduct } from '../features/product/useProduct';
import ProductDetail from '../features/product/ProductDetail';
import SpinnerFull from '../ui/SpinnerFull';

function Product() {
  const { isLoading, product, error } = useProduct();

  if (isLoading) return <SpinnerFull />;
  if (error) return console.log(error);

  return <ProductDetail product={product} />;
}

export default Product;
