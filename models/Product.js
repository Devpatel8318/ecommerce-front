import mongoose, {Schema,model, models } from "mongoose";

const ProductSchema = new Schema({
    title:{type:String},
    price:{type:Number},
    description:String,
    images:[{type:String}],
    properties:{type:Object},
    category:{type:mongoose.Types.ObjectId,ref:'Category'},
},{
    timestamps:true,
})


const Products = models.Products || model('Products',ProductSchema);
module.exports = Products;