import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "../../lib/models/product";
import Profit from "../../lib/models/profit";

export async function GET(request, content) {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        // Get the current date
        const currentDate = new Date();

        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Get the last day of the current month
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);


        // Query profits within the current month
        const profits = await Profit.aggregate([
            {
                $match: {
                    date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalProfit: { $sum: "$product.profit" }
                }
            }
        ]);

        // Generate a map of dates to profits
        const profitMap = {};
        profits.forEach((result) => {
            profitMap[result._id] = result.totalProfit;
        });

        // Prepare response with profits for each day in the current month
        const response = [];
        let currentDateCursor = new Date(firstDayOfMonth);
        while (currentDateCursor <= lastDayOfMonth) {
            const formattedDate = currentDateCursor.toISOString().slice(0, 10);
            const dailyProfit = profitMap[formattedDate] || 0;
            response.push({ date: formattedDate, totalProfit: dailyProfit });
            currentDateCursor.setDate(currentDateCursor.getDate() + 1);
        }

        // Return response as JSON
        return NextResponse.json({ message: response });
    } catch (error) {
        // Handle errors
        return NextResponse.json({ message: error.message });
    } finally {
        // Disconnect from MongoDB after query
        await mongoose.disconnect();
    }
}


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