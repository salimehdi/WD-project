import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "../../lib/models/product";


export async function POST(req, res) {
    const response = await req.json();
    try {
      await mongoose.connect(process.env.MONGO_URI);
      const response1 = await Product.findOne({_id:response._id});
      return NextResponse.json({ message: response1 });
    } catch (error) {
      console.error("Error adding product:", error);
      return NextResponse.json({ message: "Failed to add product", error: error});
    }
  }