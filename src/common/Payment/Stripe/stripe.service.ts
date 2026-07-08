import { Injectable } from "@nestjs/common";
import Stripe from 'stripe'
@Injectable()
export class StripeServices {
    private readonly stripe = new Stripe(process.env.SECRET_KEY_STRIPE as string)

   async checkOut({line_items,customer_email,metadata}){
        const session = await this.stripe.checkout.sessions.create({
            mode:"payment",
            payment_method_types:['card'],
            success_url:"https://www.facebook.com/",
            cancel_url:"https://www.npmjs.com/package//stripe?activeTab=versions",
            metadata,
            line_items,
            customer_email,
            
        })
        return session
    }
}