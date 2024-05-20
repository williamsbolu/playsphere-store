import { Link } from 'react-router-dom';
import Product from './Product';
import { IoIosArrowRoundForward } from 'react-icons/io';
import ErrorPage from '../../ui/ErrorPage';

function ProductList({
  heading,
  path,
  isLoading,
  error,
  productData,
  refetch,
}) {
  if (isLoading) return;

  if (error) return <ErrorPage refetch={refetch} />;

  return (
    <section className="app-container space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-[22px] font-semibold text-body">
          {heading}
        </h2>

        <Link
          to={path}
          className="group flex items-center gap-1 text-[15px] font-semibold text-primary"
        >
          View all
          <IoIosArrowRoundForward className="invisible h-0 w-0 translate-x-7 opacity-0 transition-all duration-300 group-hover:visible group-hover:h-6 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>
      </div>

      <div className="grid auto-rows-[150px] grid-cols-3 border border-solid border-[##e1e3e4] bg-white">
        {productData.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
