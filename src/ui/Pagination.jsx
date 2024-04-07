import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  // Pagecount is the total number of pages that will be returned
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    // if we are on the last page
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    // if we're on the first page
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  const prevPageIsDisabled = currentPage === 1;
  const nextPageIsDisabled = currentPage === pageCount;

  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-between border border-solid border-[#e7e2de] border-t-[#e7e2de7e] px-7 py-5 text-[#1F1F1F]">
      <button
        className={`group/previous flex items-center font-medium ${prevPageIsDisabled && 'invisible'}`}
        onClick={prevPage}
      >
        <MdKeyboardArrowLeft className="h-5 w-5 transition-[all] duration-200 group-hover/previous:text-primary" />
        <span className="text-sm transition-[all] duration-200 group-hover/previous:text-primary">
          Previous
        </span>
      </button>

      <div className="flex gap-2 text-sm font-medium">
        {!prevPageIsDisabled && (
          <button className="h-6 w-6 rounded-full" onClick={prevPage}>
            {currentPage - 1}
          </button>
        )}
        <button className="h-6 w-6 rounded-full bg-primary text-white">
          {currentPage}
        </button>
        {!nextPageIsDisabled && (
          <button className="h-6 w-6 rounded-full" onClick={nextPage}>
            {currentPage + 1}
          </button>
        )}
      </div>

      <button
        className={`group/next flex items-center font-medium ${nextPageIsDisabled && 'invisible'}`}
        onClick={nextPage}
      >
        <span className="text-sm transition-[all] duration-200 group-hover/next:text-primary">
          Next
        </span>
        <MdKeyboardArrowRight className="h-5 w-5 transition-[all] duration-200 group-hover/next:text-primary" />
      </button>
    </div>
  );
}

export default Pagination;
