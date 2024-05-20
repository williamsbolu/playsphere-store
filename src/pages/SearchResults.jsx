import { useSearchParams } from 'react-router-dom';
import ProductListComplete from '../features/product/ProductListComplete';
import ErrorPage from '../ui/ErrorPage';
import SpinnerFull from '../ui/SpinnerFull';
import { useSearchProductPage } from '../features/product/useSearchProductPage';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const {
    isLoading,
    data: products,
    error,
    count,
    refetch,
  } = useSearchProductPage();

  if (isLoading) return <SpinnerFull />;
  if (error) return <ErrorPage type="full" refetch={refetch} />;

  return (
    <ProductListComplete
      productData={products.data}
      pageContentHeader={`Search results for "${searchParams.get('q')}"`}
      count={count}
    />
  );
}

export default SearchResults;
