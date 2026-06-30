import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac } from "crypto";

interface OpayCreateResponse {
  code: string;
  message: string;
  data?: {
    cashierUrl?: string;
    orderNo?: string;
    reference?: string;
  };
}

interface OpayStatusResponse {
  code: string;
  message: string;
  data?: {
    status?: string;
    reference?: string;
    amount?: {
      total?: number;
      currency?: string;
    };
  };
}

@Injectable()
export class OpayService {
  constructor(private readonly config: ConfigService) {}

  private get merchantId() {
    return this.config.get<string>("OPAY_MERCHANT_ID") ?? "";
  }

  private get publicKey() {
    return this.config.get<string>("OPAY_PUBLIC_KEY") ?? "";
  }

  private get secretKey() {
    return this.config.get<string>("OPAY_SECRET_KEY") ?? "";
  }

  private get apiBase() {
    return this.config.get<string>("OPAY_API_BASE") ??
      "https://testapi.opaycheckout.com";
  }

  isSandboxMode() {
    return (
      this.config.get<string>("PAYMENTS_SANDBOX") === "true" ||
      !this.secretKey ||
      this.secretKey.includes("placeholder")
    );
  }

  private signPayload(payload: Record<string, unknown>) {
    const sorted = Object.keys(payload)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = payload[key];
        return acc;
      }, {});

    return createHmac("sha512", this.secretKey)
      .update(JSON.stringify(sorted))
      .digest("hex");
  }

  async initializePayment(input: {
    email: string;
    amountKobo: number;
    reference: string;
    callbackUrl: string;
    returnUrl: string;
    customerName: string;
  }) {
    if (this.isSandboxMode()) {
      const callback = new URL(input.returnUrl);
      callback.searchParams.set("reference", input.reference);
      callback.searchParams.set("provider", "opay");

      return {
        authorizationUrl: callback.toString(),
        reference: input.reference,
        sandbox: true,
      };
    }

    const payload = {
      country: "NG",
      reference: input.reference,
      amount: {
        total: input.amountKobo,
        currency: "NGN",
      },
      callbackUrl: input.callbackUrl,
      returnUrl: input.returnUrl,
      cancelUrl: input.returnUrl,
      customerName: input.customerName,
      customerEmail: input.email,
      product: {
        name: "Oshus Store Order",
        description: `Order ${input.reference}`,
      },
    };

    const signature = this.signPayload(payload);

    const response = await fetch(
      `${this.apiBase}/api/v1/international/cashier/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${signature}`,
          MerchantId: this.merchantId,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = (await response.json()) as OpayCreateResponse;

    if (!response.ok || result.code !== "00000" || !result.data?.cashierUrl) {
      throw new Error(result.message || "OPay initialization failed.");
    }

    return {
      authorizationUrl: result.data.cashierUrl,
      reference: result.data.reference ?? input.reference,
      sandbox: false,
    };
  }

  async verifyPayment(reference: string) {
    if (this.isSandboxMode()) {
      return {
        success: true,
        reference,
        amountKobo: 0,
        paidAt: new Date().toISOString(),
        sandbox: true,
      };
    }

    const payload = { reference };
    const signature = this.signPayload(payload);

    const response = await fetch(
      `${this.apiBase}/api/v1/international/cashier/status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${signature}`,
          MerchantId: this.merchantId,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = (await response.json()) as OpayStatusResponse;

    if (!response.ok || result.code !== "00000" || !result.data) {
      throw new Error(result.message || "OPay verification failed.");
    }

    const paidStatuses = new Set(["SUCCESS", "SUCCESSFUL", "PAID"]);
    const status = (result.data.status ?? "").toUpperCase();

    return {
      success: paidStatuses.has(status),
      reference: result.data.reference ?? reference,
      amountKobo: result.data.amount?.total ?? 0,
      paidAt: new Date().toISOString(),
      sandbox: false,
    };
  }
}
