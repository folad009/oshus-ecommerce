"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  convertFromNgn,
  formatCurrency,
  formatFromNgn,
  type StoreCurrency,
} from "@/lib/currency";

const STORAGE_KEY = "oshus-currency";

interface CurrencyContextValue {
  currency: StoreCurrency;
  hydrated: boolean;
  setCurrency: (currency: StoreCurrency) => void;
  convertFromNgn: (amountNgn: number) => number;
  formatFromNgn: (amountNgn: number) => string;
  formatAmount: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function loadCurrency(): StoreCurrency {
  if (typeof window === "undefined") {
    return "NGN";
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "ZAR" ? "ZAR" : "NGN";
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<StoreCurrency>("NGN");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCurrencyState(loadCurrency());
    setHydrated(true);
  }, []);

  const setCurrency = useCallback((next: StoreCurrency) => {
    setCurrencyState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const convert = useCallback(
    (amountNgn: number) => convertFromNgn(amountNgn, currency),
    [currency]
  );

  const formatFromNgnAmount = useCallback(
    (amountNgn: number) => formatFromNgn(amountNgn, currency),
    [currency]
  );

  const formatAmount = useCallback(
    (amount: number) => formatCurrency(amount, currency),
    [currency]
  );

  const value = useMemo(
    () => ({
      currency,
      hydrated,
      setCurrency,
      convertFromNgn: convert,
      formatFromNgn: formatFromNgnAmount,
      formatAmount,
    }),
    [currency, hydrated, setCurrency, convert, formatFromNgnAmount, formatAmount]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
