import Empty from '../../ui/Empty';
import ProductOperations from './ProductOperations';
import ProductComplete from './ProductComplete';
import Pagination from '../../ui/Pagination';

function ProductListComplete({ count, productData, pageContentHeader }) {
  if (productData.length === 0) return <Empty />;

  return (
    <section className="app-container pb-16 pt-6">
      <ProductOperations count={count} pageContentHeader={pageContentHeader} />

      <div className="grid grid-cols-4 border border-solid border-[#e1e3e4] bg-white">
        {productData.map((product) => (
          <ProductComplete key={product.id || product._id} product={product} />
        ))}
      </div>

      <Pagination count={count} />
    </section>
  );
}

export default ProductListComplete;
