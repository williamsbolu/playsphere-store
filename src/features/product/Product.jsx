import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

function Product({ product }) {
  const { discountedValue, coverImageUrl, name, price, originalPrice, slug } =
    product;

  return (
    <div className="relative grid grid-cols-[1fr_2fr] gap-4 border border-[#e7e2de] p-5 text-[#1F1F1F]">
      {originalPrice && (
        <span className="absolute top-[10px] rounded-e-xl bg-primary px-3 py-[2px] text-[12px] font-medium text-white">
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
          className="mb-3 block text-sm font-medium transition-all duration-300 hover:text-primary"
        >
          {name}
        </Link>
        <span className="inline-block text-[15px] font-medium text-primary">
          {formatCurrency(price)}
        </span>
        {originalPrice && (
          <span className="relative ml-3 inline-block text-[13px]">
            {formatCurrency(originalPrice)}
            <span className="absolute left-0 top-[45%] inline-block h-[1px] w-full bg-[#000000B3]"></span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Product;
