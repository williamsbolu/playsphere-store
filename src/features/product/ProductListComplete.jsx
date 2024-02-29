import ProductComplete from './ProductComplete';

function ProductListComplete() {
  return (
    <section className="container mx-auto space-y-5 px-10">
      <h2 className="font-heading text-[23px] font-semibold">
        Recent Products
      </h2>

      <div className="grid grid-cols-4">
        <ProductComplete />
        <ProductComplete />
        <ProductComplete />
        <ProductComplete />
        <ProductComplete />
        <ProductComplete />
        <ProductComplete />
        <ProductComplete />
        <ProductComplete />
      </div>
    </section>
  );
}

export default ProductListComplete;
