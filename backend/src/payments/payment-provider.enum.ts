export enum PaymentProvider {
  PAYSTACK = "paystack",
  OPAY = "opay",
}

export function normalizePaymentProvider(value: string): PaymentProvider | null {
  const normalized = value.trim().toLowerCase();
  if (normalized === PaymentProvider.PAYSTACK) {
    return PaymentProvider.PAYSTACK;
  }
  if (normalized === PaymentProvider.OPAY) {
    return PaymentProvider.OPAY;
  }
  return null;
}
