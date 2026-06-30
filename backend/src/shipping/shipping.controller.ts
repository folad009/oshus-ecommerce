import { Body, Controller, Post } from "@nestjs/common";
import { KwikQuoteDto } from "./dto/kwik-quote.dto";
import { KwikService } from "./kwik.service";

@Controller("shipping")
export class ShippingController {
  constructor(private readonly kwikService: KwikService) {}

  @Post("kwik/quote")
  quote(@Body() body: KwikQuoteDto) {
    return this.kwikService.quoteDelivery(body);
  }
}
