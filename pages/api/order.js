import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import Order from '@/models/Order';


// export default async function handle(req, res) {
//     await mongooseConnect();
//     const orderId = req.body.orderId;
//     console.log(orderId);
//     await Order.findByIdAndUpdate(orderId, {
//         paid: true,
//     })
//     res.json("ok");
// }
export default async function handle(req, res) {
    try {
        await mongooseConnect();
        const orderId = req.body.orderId;
        console.log(orderId);
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { paid: true }, { new: true });
        if (!updatedOrder) {
            throw new Error('Order not found');
        }
        res.json("ok");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}