import { formatCurrency } from '../../utils/helpers';

function CheckoutCarts({ item }) {
  const {
    _id: cartId,
    product: { _id: productId, name, coverImageUrl },
    price,
    quantity,
  } = item;

  return (
    <li className="border-[rgba(0, 0, 0, 0.105)] group relative grid grid-cols-[70px_1fr] gap-4 py-4 transition-all duration-300">
      <div className="relative">
        <img src={coverImageUrl} alt={name} className="w-full" />
      </div>

      <div className="">
        <h3 className="text-body mb-[6px] text-[13px] font-bold uppercase">
          {name}
        </h3>
        <div className="text-[0.813rem]">
          <span className="text-body">{quantity} x</span>{' '}
          <span className="font-bold text-primary">
            {formatCurrency(price, 2)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default CheckoutCarts;
