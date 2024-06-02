export function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export const formatCurrency = (value, maxDigit) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: maxDigit || 0,
  }).format(value);

export function getProductCategoriesText(
  category,
  platform,
  platformsCompleteObj,
) {
  let categoryText = null;

  if (
    category === 'video-game-console' ||
    category === 'accessories' ||
    category === 'handheld-game-console'
  ) {
    categoryText = platformsCompleteObj[platform] + ' Consoles and Accessories';
  } else if (category === 'video-games') {
    categoryText = platformsCompleteObj[platform] + ' Games';
  } else if (category === 'gift-card') {
    categoryText = 'Gift Cards';
  }

  return categoryText;
}

// export function createOrderInformation(
//   cart,
//   deliveryAddress,
//   selectedOption,
//   isLoggedIn = false,
// ) {
//   const userDeliveryAddress = { ...deliveryAddress };
//   delete userDeliveryAddress.isDefault;
//   delete userDeliveryAddress._id;

//   const order = cart.products.map((cart) => {
//     const userField = !isLoggedIn
// ? { userEmail: userDeliveryAddress.email }
//       : { user: cart.user };

//     return {
//       productName: cart.product.name,
//       product: cart.product._id,
//       quantity: cart.quantity,
//       price: cart.price,
//       paymentMethod: selectedOption,
//       deliveryAddress: userDeliveryAddress,
//       ...userField,
//     };
//   });

//   return order;
// }

export function calculateShipping(cart) {
  const shippingCosts = {
    sm: 3000,
    lg: 5000,
    xl: 7000,
  };

  const extraFeePercentage = 0.1; // 10% extra fee
  const sizeQuantities = {};

  // Aggregate quantities for each size
  cart.products.forEach((cartItem) => {
    const { size } = cartItem.product;
    const quantity = cartItem.quantity;

    if (sizeQuantities[size]) {
      sizeQuantities[size] += quantity;
    } else {
      sizeQuantities[size] = quantity;
    }
  });

  // Calculate the total shipping cost
  return Object.keys(sizeQuantities).reduce((totalShipping, size) => {
    const quantity = sizeQuantities[size];
    const baseShippingCost = shippingCosts[size];

    // Calculate the number of extra groups of 4 (excluding the first group)
    const extraGroups = Math.floor((quantity - 1) / 4);

    // Calculate the total extra fee
    const extraFee = extraGroups * baseShippingCost * extraFeePercentage;

    // Add the base shipping cost once and the extra fee
    return totalShipping + baseShippingCost + extraFee;
  }, 0);
}

export function createOrderInformation(
  cart,
  deliveryAddress,
  selectedOption,
  userId,
) {
  const userDeliveryAddress = { ...deliveryAddress };
  delete userDeliveryAddress.isDefault;
  delete userDeliveryAddress._id;

  // The userId determines the isLoggedIn state
  const userField = !userId
    ? { userEmail: userDeliveryAddress.email }
    : { user: userId };

  const products = cart.products.map((item) => {
    const originalPriceField = item.product.originalPrice
      ? { originalPrice: item.product.originalPrice }
      : {};

    return {
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
      ...originalPriceField,
    };
  });

  const deliveryFees = calculateShipping(cart);

  const order = {
    ...userField,
    products,
    totalQuantity: cart.totalQuantity,
    totalAmount: cart.totalAmount,
    deliveryFees,
    paymentMethod: selectedOption,
    deliveryAddress: userDeliveryAddress,
  };

  return order;
}

export function saveDataToLocalStorage(key, data, dataKey) {
  const oneMonthInMilliseconds = 2 * 24 * 60 * 60 * 1000; // 2 days
  // const fiveMinutesInMilliseconds = 1 * 60 * 1000; // 5 minutes

  const now = new Date().getTime();
  const expirationTime = now + oneMonthInMilliseconds;
  const storageData = {
    [dataKey]: data,
    expiration: expirationTime,
  };
  localStorage.setItem(key, JSON.stringify(storageData));
}
