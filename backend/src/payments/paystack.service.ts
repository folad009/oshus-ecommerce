import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHmac } from "crypto";

interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data?: {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at?: string;
  };
}

@Injectable()
export class PaystackService {
  constructor(private readonly config: ConfigService) {}

  private get secretKey() {
    return this.config.get<string>("PAYSTACK_SECRET_KEY") ?? "";
  }

  private get publicKey() {
    return this.config.get<string>("PAYSTACK_PUBLIC_KEY") ?? "";
  }

  isSandboxMode() {
    const key = this.secretKey;
    return (
      this.config.get<string>("PAYMENTS_SANDBOX") === "true" ||
      !key ||
      key.includes("placeholder")
    );
  }

  getPublicKey() {
    return this.publicKey || "pk_test_placeholder";
  }

  verifyWebhookSignature(rawBody: Buffer, signature: string | undefined) {
    if (this.isSandboxMode()) {
      return true;
    }

    if (!signature) {
      return false;
    }

    const hash = createHmac("sha512", this.secretKey)
      .update(rawBody)
      .digest("hex");

    return hash === signature;
  }

  async initializePayment(input: {
    email: string;
    amountKobo: number;
    reference: string;
    callbackUrl: string;
    metadata?: Record<string, string>;
  }) {
    if (this.isSandboxMode()) {
      const callback = new URL(input.callbackUrl);
      callback.searchParams.set("reference", input.reference);
      callback.searchParams.set("provider", "paystack");
      callback.searchParams.set("trxref", input.reference);

      return {
        authorizationUrl: callback.toString(),
        reference: input.reference,
        accessCode: `sandbox_${input.reference}`,
        sandbox: true,
      };
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          amount: input.amountKobo,
          reference: input.reference,
          callback_url: input.callbackUrl,
          metadata: input.metadata,
          currency: "NGN",
        }),
      }
    );

    const payload = (await response.json()) as PaystackInitializeResponse;

    if (!response.ok || !payload.status || !payload.data) {
      throw new Error(payload.message || "Paystack initialization failed.");
    }

    return {
      authorizationUrl: payload.data.authorization_url,
      reference: payload.data.reference,
      accessCode: payload.data.access_code,
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

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      }
    );

    const payload = (await response.json()) as PaystackVerifyResponse;

    if (!response.ok || !payload.status || !payload.data) {
      throw new Error(payload.message || "Paystack verification failed.");
    }

    return {
      success: payload.data.status === "success",
      reference: payload.data.reference,
      amountKobo: payload.data.amount,
      paidAt: payload.data.paid_at ?? new Date().toISOString(),
      sandbox: false,
    };
  }
}
