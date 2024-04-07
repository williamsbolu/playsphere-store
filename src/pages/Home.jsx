import ProductList from '../features/product/ProductList';
import Hero from '../ui/Hero';
import SpinnerFull from '../ui/SpinnerFull';
import BrandsCarousel from '../ui/BrandsCarousel';
import { useHotDeals } from '../features/product/useHotDeals';
import { useRecentProducts } from '../features/product/useRecentProducts';

function Home() {
  const {
    isLoading: productDealsIsLoading,
    error: productDealsError,
    product: productDeals,
    refetch: refetchProductDeals,
  } = useHotDeals();

  const {
    isLoading: recentProductsIsLoading,
    error: recentProductsError,
    product: recentProducts,
    refetch: refetchRecentProducts,
  } = useRecentProducts();

  if (productDealsIsLoading && recentProductsIsLoading) return <SpinnerFull />;

  return (
    <>
      <Hero />

      <section className="space-y-14 py-14">
        <ProductList
          isLoading={productDealsIsLoading}
          error={productDealsError}
          productData={productDeals}
          refetch={refetchProductDeals}
          heading="Hot Deals"
          path="/products/deals"
        />

        <ProductList
          isLoading={recentProductsIsLoading}
          error={recentProductsError}
          productData={recentProducts}
          refetch={refetchRecentProducts}
          heading="Recent Products"
          path="/products/recent"
        />

        <BrandsCarousel />
      </section>
    </>
  );
}

export default Home;
