import ProductListComplete from '../features/product/ProductListComplete';
import ProductList from '../features/product/ProductList';
import Hero from '../ui/Hero';

function Home() {
  return (
    <>
      <Hero />
      <section className="py-20">
        <ProductList />
      </section>
      <section className="py-20">
        <ProductListComplete />
      </section>
    </>
  );
}

export default Home;
