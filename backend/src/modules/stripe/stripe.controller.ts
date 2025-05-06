import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  RawBodyRequest,
  Headers,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Response, Request } from 'express';
export enum StripeEventType {
  SubscriptionCreated = 'customer.subscription.created',
  SubscriptionUpdated = 'customer.subscription.updated',
  SubscriptionDeleted = 'customer.subscription.deleted',
  PaymentSucceeded = 'invoice.payment_succeeded',
  PaymentFailed = 'invoice.payment_failed',
}

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: { priceId: string; customerId: string },
    @Res() response: Response,
  ) {
    try {
      // const { priceId, customerId } = body;
      const customerId = 'cus_SFrCv50llgVD0Q';
      const priceId = 'price_1RLK6uSJeIpJTOugJHeuejZQ';

      const session = await this.stripeService.createSubscriptionCheckout(
        priceId,
        customerId,
        `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        `${process.env.FRONTEND_URL}/payment/canceled`,
      );

      response.json({ url: session.url });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  @Post('create-customer')
  async createCustomer(@Body() body: { email: string; name: string }) {
    try {
      const { email, name } = body;
      const customer = await this.stripeService.createCustomer(email, name);
      return { customerId: customer.id };
    } catch (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }

  @Get('subscriptions/:customerId')
  async getSubscriptions(@Param('customerId') customerId: string) {
    try {
      const customerId = 'cus_SFrCv50llgVD0Q';
      const subscriptions =
        await this.stripeService.getActiveSubscriptions(customerId);
      return { subscriptions };
    } catch (error) {
      throw new Error(`Failed to fetch subscriptions: ${error.message}`);
    }
  }

  @Post('cancel-subscription')
  async cancelSubscription(@Body() body: { subscriptionId: string }) {
    try {
      const { subscriptionId } = body;
      const canceledSubscription =
        await this.stripeService.cancelSubscription(subscriptionId);
      return { success: true, subscription: canceledSubscription };
    } catch (error) {
      throw new Error(`Failed to cancel subscription: ${error.message}`);
    }
  }

  @Post('update-subscription')
  async updateSubscription(
    @Body() body: { subscriptionId: string; newPriceId: string },
  ) {
    try {
      const { subscriptionId, newPriceId } = body;
      const updatedSubscription =
        await this.stripeService.updateSubscriptionPlan(
          subscriptionId,
          newPriceId,
        );
      return { success: true, subscription: updatedSubscription };
    } catch (error) {
      throw new Error(`Failed to update subscription: ${error.message}`);
    }
  }

  @Post('create-billing-portal')
  async createBillingPortal(@Body() body: { customerId: string }) {
    try {
      const { customerId } = body;
      const session = await this.stripeService.createBillingPortalSession(
        customerId,
        `${process.env.FRONTEND_URL}/account`,
      );
      return { url: session.url };
    } catch (error) {
      throw new Error(`Failed to create billing portal: ${error.message}`);
    }
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
    @Res() res: Response,
  ) {
    try {
      const payload = req.body;
      const event = await this.stripeService.handleWebhookEvent(
        signature,
        payload,
      );
      switch (event.type) {
        case StripeEventType.SubscriptionCreated:
          console.log('Subscription created:', event.data.object);
          break;

        case StripeEventType.SubscriptionUpdated:
          console.log('Subscription updated:', event.data.object);
          break;

        case StripeEventType.SubscriptionDeleted:
          console.log('Subscription canceled:', event.data.object);
          break;

        case StripeEventType.PaymentSucceeded:
          console.log('Payment succeeded:', event.data.object);
          break;

        case StripeEventType.PaymentFailed:
          console.log('Payment failed:', event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.status(200).send({ received: true });
    } catch (error) {
      console.error('Webhook error:', error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
}
