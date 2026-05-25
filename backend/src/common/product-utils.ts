export function computeDiscount(price: number, originalPrice: number): string {
  if (originalPrice <= price) {
    return "";
  }
  const percent = Math.round(((originalPrice - price) / originalPrice) * 100);
  return `${percent}% off`;
}
