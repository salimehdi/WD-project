const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the product schema
const productSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  brandName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  buyingPrice: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  maxSellingPrice: {
    type: Number,
    required: true
  }
});

// Create the Product model using the productSchema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;