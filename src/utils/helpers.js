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

export function saveDataToLocalStorage(key, data, dataKey) {
  // const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days
  const fiveMinutesInMilliseconds = 1 * 60 * 1000; // 5 minutes

  const now = new Date().getTime();
  const expirationTime = now + fiveMinutesInMilliseconds;
  const storageData = {
    [dataKey]: data,
    expiration: expirationTime,
  };
  localStorage.setItem(key, JSON.stringify(storageData));
}

function caculateProductsDeliveryCost(productList) {}
