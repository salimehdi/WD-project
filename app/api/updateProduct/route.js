import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "../../lib/models/product";


export async function POST(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Parse the request body to extract the required data
    const { _id, incDec } = await req.json();

    // Find the product by _id and increment the quantity by incDec
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { $inc: { quantity: incDec } },
      { new: true } // Returns the updated document
    );

    if (!updatedProduct) {
      return NextResponse.status(404).json({ message: 'Product not found' });
    }

    return NextResponse.json({ message: 'Product quantity updated', updatedProduct });
  } catch (error) {
    console.error('Error updating product quantity:', error);
    return NextResponse.status(500).json({ message: 'Failed to update product quantity', error: error.message });
  }
}
