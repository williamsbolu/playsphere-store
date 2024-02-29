import Product from './Product';

function ProductList({ productData }) {
  return (
    <section className="container mx-auto space-y-5 px-10">
      <h2 className="font-heading text-[23px] font-semibold">
        Recent Products
      </h2>

      <div className="grid auto-rows-[150px] grid-cols-3">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </section>
  );
}

export default ProductList;
