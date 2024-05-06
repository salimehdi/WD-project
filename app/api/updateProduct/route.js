import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "../../lib/models/product";
import Profit from "../../lib/models/profit";


export async function POST(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Parse the request body to extract the required data
    const { _id, incDec, sp } = await req.json();

    // Find the product by _id and increment the quantity by incDec
    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { $inc: { quantity: incDec } },
      { new: true } // Returns the updated document
    );

    const {productName, brandName, category, buyingPrice, quantity, maxSellingPrice} = updatedProduct;
    const qty = Math.abs(incDec);
    const toUpdInProfit = {productName, brandName, category, buyingPrice, qty , maxSellingPrice , sp:sp , profit: (sp - buyingPrice) * qty};
    
    if (!updatedProduct) {
      return NextResponse.status(404).json({ message: 'Product not found' });
    } else if (incDec < 0) {
      let saveToProfit = await Profit.findOne({date: new Date().toLocaleDateString()});
      if(!saveToProfit){
        let profit = new Profit({date: new Date().toLocaleDateString(), product: [toUpdInProfit]});
        let savingToProfit = await profit.save();
      } else {
        let updatingToProfit = await Profit.updateOne({date: new Date().toLocaleDateString()} , { $push: { product: toUpdInProfit } } );
      }
    }

    return NextResponse.json({ message: 'Product quantity updated', updatedProduct });
  } catch (error) {
    console.error('Error updating product quantity:', error);
    return NextResponse.status(500).json({ message: 'Failed to update product quantity', error: error.message });
  }
}
