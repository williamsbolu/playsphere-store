import { Link, useSearchParams } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import SortBy from '../../ui/SortBy';
import { PAGE_SIZE } from '../../utils/constants';

function ProductOperations({ count, pageContentHeader }) {
  const [searchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  // Pagecount is the total number of pages that will be returned
  const pageCount = Math.ceil(count / PAGE_SIZE);

  return (
    <div className="my-7 flex items-center justify-between text-[#1F1F1F]">
      <ul className="flex items-center space-x-1 text-[13px]">
        <li className="flex items-center font-normal">
          <Link
            to="/"
            className="transition-all duration-200 hover:text-primary"
          >
            Home
          </Link>
          <MdKeyboardArrowRight className="h-4 w-4" />
        </li>
        <li>
          <span className="text-sm font-medium">{pageContentHeader}</span>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-[#333]">
          Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> -{' '}
          <span>
            {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
          </span>{' '}
          of <span>{count}</span> results
        </p>

        <SortBy
          options={[
            { value: 'createdAt-desc', label: 'Sort by date: new to old' },
            { value: 'createdAt-asc', label: 'Sort by date: old to new' },
            { value: 'price-asc', label: 'Sort by price: low to high' },
            { value: 'price-desc', label: 'Sort by price: high to low' },
          ]}
        />
      </div>
    </div>
  );
}

export default ProductOperations;
