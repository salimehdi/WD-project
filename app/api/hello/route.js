import { NextResponse } from "next/server";
import mongoose from "mongoose";
import productSchema from "./model/productSchema";


const Product = mongoose.model('Product', productSchema);


export async function GET(request, content) {
    await mongoose.connect(process.env.MONGO_URI);
    const products = await Product.find({});
    
    return NextResponse.json({ message: "Hello, World!" });
}