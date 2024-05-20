import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

function Product({ product }) {
  const { discountedValue, coverImageUrl, name, price, originalPrice, slug } =
    product;

  return (
    <div className="relative grid grid-cols-[1fr_2fr] gap-4 border border-[#e1e3e4] p-5 text-[#1F1F1F]">
      {originalPrice && (
        <span className="absolute top-[10px] rounded-e-[3px] bg-primary px-3 py-[2px] text-[12px] font-medium text-white">
          Save {discountedValue}%
        </span>
      )}

      <Link to={`/product/${slug}`} className="inline-block">
        <img
          src={coverImageUrl}
          className="block h-[110px] w-[110px]"
          alt={name}
        />
      </Link>

      <div>
        <Link
          to={`/product/${slug}`}
          className="text-body mb-3 block text-[13px] font-bold uppercase transition-all duration-300 hover:text-primary"
        >
          {name}
        </Link>
        <span className="inline-block text-[17px] font-semibold text-primary">
          {formatCurrency(price, 2)}
        </span>
        {originalPrice && (
          <span className="relative ml-3 inline-block text-[13px] font-medium text-black">
            {formatCurrency(originalPrice, 2)}
            <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-black"></span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Product;
