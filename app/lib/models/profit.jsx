import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the product schema
const profitSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  product: {
    type: Array,
    required: true
  },
});

const Profit = mongoose.models.Profit || mongoose.model('Profit', profitSchema);

module.exports = Profit;