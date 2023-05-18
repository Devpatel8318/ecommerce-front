import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import Order from "@/models/Order";

const endpointSecret = "whsec_87a327441d90846bb21a0fac99bdd739024a2b86c5588c4596701c52e684eb1d";

export default async function (req, res) {
    await mongooseConnect();

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            const paid = data.payment_status === 'paid';

            if(orderId &&  paid){
                await Order.findByIdAndUpdate(orderId,{
                    paid:true,
                })
            }

            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send("ok");


}


export const config={
    api:{bodyParser:false,}
}