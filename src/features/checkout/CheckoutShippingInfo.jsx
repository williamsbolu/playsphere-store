import { formatCurrency } from '../../utils/helpers';

function CheckoutShippingInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-normal">Shipping Method</h3>

      <div className="flex items-center justify-between rounded-[3px] border border-solid border-[#e1e3e4] bg-white px-5 py-4 text-sm">
        <h3>Standard Shipping</h3>
        <p>3-5 working days</p>
        <p>
          From <span>{formatCurrency(3000)}</span>
        </p>
      </div>
    </div>
  );
}

export default CheckoutShippingInfo;
