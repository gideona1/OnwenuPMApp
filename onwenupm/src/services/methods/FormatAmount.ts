export const formatAmount = (amount: number | undefined) => {
  return amount ? `$${(amount / 100).toFixed(2)}` : '---';
};
