export type StoreCurrency = "NGN" | "ZAR";

const DEFAULT_NGN_TO_ZAR_RATE = 0.012;

export const CURRENCY_OPTIONS: {
  code: StoreCurrency;
  label: string;
  symbol: string;
  locale: string;
}[] = [
  { code: "NGN", label: "Nigerian Naira", symbol: "₦", locale: "en-NG" },
  { code: "ZAR", label: "South African Rand", symbol: "R", locale: "en-ZA" },
];

export function getNgnToZarRate(): number {
  const raw = process.env.NEXT_PUBLIC_NGN_TO_ZAR_RATE;
  const rate = raw ? Number.parseFloat(raw) : DEFAULT_NGN_TO_ZAR_RATE;
  return Number.isFinite(rate) && rate > 0 ? rate : DEFAULT_NGN_TO_ZAR_RATE;
}

export function convertFromNgn(
  amountNgn: number,
  currency: StoreCurrency
): number {
  if (currency === "ZAR") {
    return Math.max(0, Math.round(amountNgn * getNgnToZarRate()));
  }
  return amountNgn;
}

export function formatCurrency(
  amount: number,
  currency: StoreCurrency = "NGN"
): string {
  const option = CURRENCY_OPTIONS.find((entry) => entry.code === currency);
  const symbol = option?.symbol ?? "₦";
  const locale = option?.locale ?? "en-NG";
  return `${symbol}${amount.toLocaleString(locale)}`;
}

export function formatFromNgn(
  amountNgn: number,
  currency: StoreCurrency
): string {
  return formatCurrency(convertFromNgn(amountNgn, currency), currency);
}

/** @deprecated Use formatFromNgn or formatCurrency instead */
export function formatNaira(amount: number): string {
  return formatCurrency(amount, "NGN");
}
