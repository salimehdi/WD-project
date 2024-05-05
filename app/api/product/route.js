import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "../../lib/models/product";

function generateRandom15DigitInteger() {
    const min = 100000000000000;
    const max = 999999999999999;
  
    // Generate a random number scaled to the desired range
    const randomNumber = Math.random();
    const scaledNumber = Math.floor(randomNumber * (max - min + 1)) + min;
  
    // Convert the scaled number to a string (ensures it's exactly 15 digits)
    const random15DigitInteger = String(scaledNumber);
  
    return random15DigitInteger;
  }


export async function GET(request, content) {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        const products = await Product.find({});
        
        return NextResponse.json({ message: products });
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}
export async function POST(req, res) {
    // Destructure product data from request body
    const response = await req.json();
    const { productName, brandName, category, buyingPrice, quantity, maxSellingPrice } = response;
    console.log(response);
    try {
      // Connect to MongoDB using Mongoose
      await mongoose.connect(process.env.MONGO_URI);
      const barcode = generateRandom15DigitInteger()
      // Create a new Product instance
      const product = new Product({
        productName,
        brandName,
        category,
        buyingPrice,
        quantity,
        maxSellingPrice,
        barcode
      });
  
      // Save the product to the database
      await product.save();
  
      // Respond with success message
      return NextResponse.json({ message: "Product Added Successfully" });
    } catch (error) {
      // Handle errors and respond with error message
      console.error("Error adding product:", error);
      return NextResponse.json({ message: "Failed to add product", error: error});
    }
  }
