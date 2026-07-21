import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';
@Injectable()
export class StripeServices {
  private readonly stripe = new Stripe(process.env.SECRET_KEY_STRIPE as string);
  private readonly endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  async checkOut({ line_items, customer_email, metadata }) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: 'https://www.facebook.com/',
      cancel_url: 'https://www.npmjs.com/package//stripe?activeTab=versions',
      metadata,
      line_items,
      customer_email,
    });
    return session;
  }
  webhook(req: Request) {
    let event = req.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (this.endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers['stripe-signature'];

        event = this.stripe.webhooks.constructEvent(
        req.body,
        signature as string,
        this.endpointSecret,
      );
    }
    return event.data.object;
  }
}
