export const displayMoney = (n) => {
  const format = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 1,
  });

  return format.format(n);
};
