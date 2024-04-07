import Empty from '../../ui/Empty';
import ProductOperations from './ProductOperations';
import ProductComplete from './ProductComplete';
import Pagination from '../../ui/Pagination';

function ProductListComplete({ count, productData, pageContentHeader }) {
  if (productData.data.length === 0) return <Empty />;

  return (
    <section className="app-container mb-16 mt-6">
      <ProductOperations count={count} pageContentHeader={pageContentHeader} />

      <div className="grid grid-cols-4 border-r border-t border-solid border-[#e7e2de]">
        {productData.data.map((product) => (
          <ProductComplete key={product.id} product={product} />
        ))}
      </div>

      <Pagination count={count} />
    </section>
  );
}

export default ProductListComplete;
