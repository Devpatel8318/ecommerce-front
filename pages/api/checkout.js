import { mongooseConnect } from "@/lib/mongoose";
import Product from '@/models/Product';
import Order from '@/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SK);
export default async function handle(req, res) {
    if (req.method !== 'POST') {
        res.json('Should be a POST request');
    } else {
        const { name, email,
            address, city,
            postalCode, cartProducts,
        } = req.body;
        await mongooseConnect();
        const productsIds = cartProducts;
        const uniqueIds = [...new Set(productsIds)];
        const productsInfos = await Product.find({ _id: uniqueIds });

        // // Function to convert INR to USD
        // function convertINRtoUSD(amount) {
        //     console.log(amount);
        //     const exchangeRate = 0.0121; // Replace with the current exchange rate
        //     const convertedAmount = amount * exchangeRate;
        //     const roundedAmount = Math.round(convertedAmount * 100);
        //     console.log(roundedAmount);
        //     return roundedAmount;
        // }

        let line_items = [];
        for (const productId of uniqueIds) {
            const productInfo = productsInfos.find(p => p._id.toString() === productId);
            // console.log(productInfo);
            const quantity = productsIds.filter(id => id === productId)?.length || 0;
            if (quantity > 0 && productInfo) {
                line_items.push({
                    quantity,
                    price_data: {
                        currency: 'INR',
                        product_data: { name: productInfo.title },
                        unit_amount: productInfo.price *100,
                    }
                });
            }
        }
        const orderDoc = await Order.create({
            name, email,
            address, city,
            postalCode, line_items, paid: false,
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            customer_email: email,
            success_url: process.env.PUBLIC_URL + '/cart?success=1',
            cancel_url: process.env.PUBLIC_URL + '/cart?cancel=1',
            metadata: {
                orderId: orderDoc._id.toString(),
            }
        });


        res.json({
            url: session.url,
        });

    }
}