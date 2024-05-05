import { NextResponse } from "next/server";
import mongoose from "mongoose";
import productSchema from "./model/productSchema";

const productSchema = new mongoose.Schema({
    productName: '',
    brandName: '',
    category: '',
    buyingPrice: '',
    quantity: '',
    maxSellingPrice: ''
})


const Product = mongoose.model('Product', productSchema);


export async function GET(request, content) {
    await mongoose.connect(process.env.MONGO_URI);
    return NextResponse.json({ message: "Hello, World!" });
}