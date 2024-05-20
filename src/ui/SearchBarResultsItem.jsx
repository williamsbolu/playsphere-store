import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';

function SearchBarResultsItem({ item, onCloseSearchResults }) {
  const { coverImageUrl, name, price, slug } = item;

  return (
    <li className="px-5 py-3 transition-all duration-300 hover:bg-primary/10">
      <Link
        to={`/product/${slug}`}
        className="grid grid-cols-[min-content_1fr] gap-5"
        onClick={onCloseSearchResults}
      >
        <div className="h-16 w-16">
          <img src={coverImageUrl} alt={name} />
        </div>
        <div className="space-y-3 py-1">
          <h3 className="text-[12px] font-semibold uppercase text-black">
            {name}
          </h3>
          <span className="text-sm text-primary">
            {formatCurrency(price, 2)}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default SearchBarResultsItem;
// bg-primary/5
