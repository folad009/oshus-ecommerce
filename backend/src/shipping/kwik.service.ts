import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface KwikQuoteInput {
  deliveryAddress: string;
  deliveryCity: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  latitude?: number;
  longitude?: number;
}

export interface KwikQuoteResult {
  fee: number;
  currency: string;
  estimatedMinutes: number;
  carrier: string;
  sandbox: boolean;
}

export interface KwikShipmentResult {
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery: string;
  sandbox: boolean;
}

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Lagos: { lat: 6.5244, lng: 3.3792 },
  Abuja: { lat: 9.0765, lng: 7.3986 },
  Ibadan: { lat: 7.3775, lng: 3.947 },
};

@Injectable()
export class KwikService {
  constructor(private readonly config: ConfigService) {}

  private get email() {
    return this.config.get<string>("KWIK_EMAIL") ?? "";
  }

  private get password() {
    return this.config.get<string>("KWIK_PASSWORD") ?? "";
  }

  private get apiBase() {
    return (
      this.config.get<string>("KWIK_API_BASE") ??
      "https://staging-api.kwik.delivery"
    );
  }

  private get pickupAddress() {
    return (
      this.config.get<string>("KWIK_PICKUP_ADDRESS") ??
      "Oshus Store Warehouse, Lagos, Nigeria"
    );
  }

  isSandboxMode() {
    return (
      this.config.get<string>("KWIK_SANDBOX") === "true" ||
      !this.email ||
      this.email.includes("placeholder")
    );
  }

  private resolveCoords(city: string, latitude?: number, longitude?: number) {
    if (latitude != null && longitude != null) {
      return { latitude, longitude };
    }

    const fallback = CITY_COORDS[city] ?? CITY_COORDS.Lagos;
    return { latitude: fallback.lat, longitude: fallback.lng };
  }

  private sandboxFee(city: string) {
    if (city === "Abuja") {
      return 3_000;
    }
    if (city === "Ibadan") {
      return 2_800;
    }
    return 2_500;
  }

  async quoteDelivery(input: KwikQuoteInput): Promise<KwikQuoteResult> {
    if (this.isSandboxMode()) {
      return {
        fee: this.sandboxFee(input.deliveryCity),
        currency: "NGN",
        estimatedMinutes: input.deliveryCity === "Lagos" ? 120 : 180,
        carrier: "Kwik",
        sandbox: true,
      };
    }

    const token = await this.login();
    const deliveryCoords = this.resolveCoords(
      input.deliveryCity,
      input.latitude,
      input.longitude
    );
    const pickupCoords = CITY_COORDS.Lagos;

    const payload = {
      timezone: "+60",
      custom_field_template: "pricing-template",
      auto_assignment: 1,
      layout_type: 1,
      pickup_custom_field_template: "pricing-template",
      has_pickup: 1,
      has_delivery: 1,
      is_multiple_tasks: 1,
      payment_method: "32",
      is_schedule_task: 1,
      deliveries: [
        {
          name: input.customerName,
          phone: input.customerPhone,
          address: input.deliveryAddress,
          latitude: deliveryCoords.latitude,
          longitude: deliveryCoords.longitude,
          time: new Date().toISOString(),
          has_return_task: false,
          is_package_insured: 0,
        },
      ],
      pickups: [
        {
          name: this.config.get<string>("KWIK_PICKUP_NAME") ?? "Oshus Store",
          email: this.config.get<string>("KWIK_PICKUP_EMAIL") ?? "store@oshus.com",
          phone: this.config.get<string>("KWIK_PICKUP_PHONE") ?? "+2348000000000",
          address: this.pickupAddress,
          latitude: pickupCoords.lat,
          longitude: pickupCoords.lng,
          time: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(`${this.apiBase}/getExactPricingForDeliveryTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as {
      status?: number;
      message?: string;
      data?: {
        per_task_cost?: number;
        insurance_amount?: number;
        total_service_charge?: number;
        currency?: { code?: string };
      };
    };

    if (!response.ok || (result.status ?? 500) >= 400 || !result.data) {
      throw new Error(result.message ?? "Kwik quote failed.");
    }

    const perTask = Number(result.data.per_task_cost ?? 0);
    const insurance = Number(result.data.insurance_amount ?? 0);
    const service = Number(result.data.total_service_charge ?? 0);
    const fee = Math.round((perTask + insurance + service) * 100);

    return {
      fee: fee > 0 ? fee : this.sandboxFee(input.deliveryCity),
      currency: result.data.currency?.code ?? "NGN",
      estimatedMinutes: 120,
      carrier: "Kwik",
      sandbox: false,
    };
  }

  async createDelivery(
    input: KwikQuoteInput & { orderNumber: string; shippingFee: number }
  ): Promise<KwikShipmentResult> {
    if (this.isSandboxMode()) {
      const trackingNumber = `KWIK-SBX-${input.orderNumber.replace("#", "")}`;
      const estimatedDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

      return {
        trackingNumber,
        trackingUrl: `https://kwik.delivery/track/${trackingNumber}`,
        estimatedDelivery: estimatedDelivery.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        sandbox: true,
      };
    }

    const token = await this.login();
    const quote = await this.quoteDelivery(input);
    const deliveryCoords = this.resolveCoords(
      input.deliveryCity,
      input.latitude,
      input.longitude
    );
    const pickupCoords = CITY_COORDS.Lagos;

    const payload = {
      timezone: "+60",
      custom_field_template: "pricing-template",
      auto_assignment: 1,
      layout_type: 1,
      pickup_custom_field_template: "pricing-template",
      has_pickup: 1,
      has_delivery: 1,
      is_multiple_tasks: 1,
      payment_method: "32",
      is_schedule_task: 1,
      amount: quote.fee / 100,
      total_no_of_tasks: 1,
      total_service_charge: 0,
      insurance_amount: 0,
      deliveries: [
        {
          name: input.customerName,
          phone: input.customerPhone,
          address: input.deliveryAddress,
          latitude: deliveryCoords.latitude,
          longitude: deliveryCoords.longitude,
          time: new Date().toISOString(),
          has_return_task: false,
          is_package_insured: 0,
        },
      ],
      pickups: [
        {
          name: this.config.get<string>("KWIK_PICKUP_NAME") ?? "Oshus Store",
          email: this.config.get<string>("KWIK_PICKUP_EMAIL") ?? "store@oshus.com",
          phone: this.config.get<string>("KWIK_PICKUP_PHONE") ?? "+2348000000000",
          address: this.pickupAddress,
          latitude: pickupCoords.lat,
          longitude: pickupCoords.lng,
          time: new Date().toISOString(),
        },
      ],
    };

    const response = await fetch(`${this.apiBase}/scheduleDeliveryTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as {
      status?: number;
      message?: string;
      data?: {
        deliveries?: Array<{
          job_hash?: string;
          result_tracking_link?: string;
        }>;
        unique_order_id?: string;
      };
    };

    if (!response.ok || (result.status ?? 500) >= 400 || !result.data) {
      throw new Error(result.message ?? "Kwik delivery booking failed.");
    }

    const delivery = result.data.deliveries?.[0];
    const trackingNumber =
      delivery?.job_hash ?? result.data.unique_order_id ?? `KWIK-${Date.now()}`;

    return {
      trackingNumber,
      trackingUrl:
        delivery?.result_tracking_link ??
        `https://kwik.delivery/track/${trackingNumber}`,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "short", year: "numeric" }
      ),
      sandbox: false,
    };
  }

  private async login() {
    const response = await fetch(`${this.apiBase}/adminLogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });

    const result = (await response.json()) as {
      status?: number;
      message?: string;
      data?: {
        access_token?: string;
      };
    };

    if (!response.ok || (result.status ?? 500) >= 400 || !result.data?.access_token) {
      throw new Error(result.message ?? "Kwik authentication failed.");
    }

    return { accessToken: result.data.access_token };
  }
}
