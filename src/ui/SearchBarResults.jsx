import SearchBarResultsLoader from './SearchBarResultsLoader';
import SearchBarResultsItem from './SearchBarResultsItem';
import ErrorPage from '../ui/ErrorPage';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

function SearchBarResults({
  items,
  isLoading,
  error,
  refetch,
  onCloseSearchResults,
  onViewResults,
}) {
  return (
    <div className="absolute left-2/4 max-h-72 w-[95%] -translate-x-2/4 overflow-y-auto rounded-b-[3px] bg-white shadow-[10px_10px_10px_-15px_rgba(0,0,0,0.3)]">
      {isLoading && <SearchBarResultsLoader />}
      {!isLoading && items?.length > 0 && (
        <ul className="grid grid-cols-2">
          {items.map((item) => (
            <SearchBarResultsItem
              key={item._id}
              item={item}
              onCloseSearchResults={onCloseSearchResults}
            />
          ))}
          <button
            className="col-span-full flex items-center justify-center gap-1 py-4 text-sm font-bold text-primary hover:bg-primary/10"
            onClick={onViewResults}
          >
            View all results <MdOutlineKeyboardArrowRight className="h-4 w-4" />
          </button>
        </ul>
      )}
      {error && <ErrorPage refetch={refetch} />}
      {items?.length === 0 && !error && !isLoading && (
        <p className="p-4 text-black">No products found</p>
      )}
    </div>
  );
}

export default SearchBarResults;
