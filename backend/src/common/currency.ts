import { ConfigService } from "@nestjs/config";
import { StoreCurrency } from "@prisma/client";

const DEFAULT_NGN_TO_ZAR_RATE = 0.012;

export function getNgnToZarRate(config: ConfigService): number {
  const raw = config.get<string>("NGN_TO_ZAR_RATE");
  const rate = raw ? Number.parseFloat(raw) : DEFAULT_NGN_TO_ZAR_RATE;
  return Number.isFinite(rate) && rate > 0 ? rate : DEFAULT_NGN_TO_ZAR_RATE;
}

export function normalizeStoreCurrency(value?: string): StoreCurrency {
  return value?.toUpperCase() === "ZAR" ? StoreCurrency.ZAR : StoreCurrency.NGN;
}

export function convertNgnToZar(amountNgn: number, rate: number): number {
  return Math.max(0, Math.round(amountNgn * rate));
}

export function toMinorUnits(amountMajor: number): number {
  return Math.round(amountMajor * 100);
}
