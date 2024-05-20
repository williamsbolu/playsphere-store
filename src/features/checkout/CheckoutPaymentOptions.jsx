function CheckoutPaymentOptions({ selectedOption, onHandleChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-normal">Payment Options</h3>

      <ul
        className={`space-y-6 rounded-[3px] border border-solid border-[#e1e3e4] bg-white ${!selectedOption && 'py-5'} ${selectedOption === 'pay-with-card' && 'py-5'} ${selectedOption === 'direct-bank-transfer' && 'pt-5'} ${selectedOption === 'pay-on-delivery' && 'pb-5'}`}
      >
        <li
          className={`${selectedOption === 'pay-on-delivery' && 'bg-primary/5 py-5'} px-5`}
        >
          <input
            type="radio"
            id="delivery"
            value="pay-on-delivery"
            name="payment-options"
            className="form__radio-input"
            checked={selectedOption === 'pay-on-delivery'}
            onChange={onHandleChange}
          />
          <label htmlFor="delivery" className="form__radio-label">
            <span className="form__radio-button"></span>

            <div className="flex flex-col gap-2">
              <span>Pay on delivery</span>

              {selectedOption === 'pay-on-delivery' && (
                <div className="grid grid-cols-2 gap-3">
                  <p className="text-sm text-[#777]">
                    Payment should be made to our agent while the item is beimg
                    delivered to you.
                  </p>
                </div>
              )}
            </div>
          </label>
        </li>

        <li
          className={`${selectedOption === 'pay-with-card' && 'bg-primary/5 py-5'} px-5`}
        >
          <input
            type="radio"
            id="card"
            value="pay-with-card"
            name="payment-options"
            className="form__radio-input"
            onChange={onHandleChange}
            checked={selectedOption === 'pay-with-card'}
          />
          <label htmlFor="card" className="form__radio-label">
            <span className="form__radio-button"></span>
            <div className="flex flex-col gap-2">
              <span>Pay with card</span>

              {selectedOption === 'pay-with-card' && (
                <div className="grid grid-cols-2 gap-3">
                  <p className="text-sm text-[#777]">
                    Pay instantly and securely on paystack with your
                    credit/debit card
                  </p>
                  <img src="/paystack-wc.png" className="h-12" alt="paystack" />
                </div>
              )}
            </div>
          </label>
        </li>

        <li
          className={`${selectedOption === 'direct-bank-transfer' && 'bg-primary/5 py-5'} px-5`}
        >
          <input
            type="radio"
            id="bank-transfer"
            value="direct-bank-transfer"
            name="payment-options"
            className="form__radio-input"
            checked={selectedOption === 'direct-bank-transfer'}
            onChange={onHandleChange}
          />
          <label htmlFor="bank-transfer" className="form__radio-label">
            <span className="form__radio-button"></span>

            <div className="flex flex-col gap-2">
              <span>Direct bank transfer</span>

              {selectedOption === 'direct-bank-transfer' && (
                <div className=" space-y-3">
                  <p className="text-sm text-[#777]">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                  <p className="text-sm text-[#777]">
                    Playsphere Global Resources <br /> 0031953471 <br />
                    Access Bank
                  </p>
                </div>
              )}
            </div>
          </label>
        </li>
      </ul>
    </div>
  );
}

export default CheckoutPaymentOptions;
