const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  createdBy: {type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
