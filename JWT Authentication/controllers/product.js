const Product = require("../models/product");

async function getProducts(req, res) {
  let products = await Product.find({});
  res.render("index", { products: products });
}

async function createProducts(req, res) {
  let { image, name, description, price } = req.body;
  await Product.create({
    image: image,
    name: name,
    description: description,
    price: price,
  });
  res.redirect("/shop");
}

async function editProduct(req, res) {
  let { image, name, description, price } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    image: image,
    name: name,
    description: description,
    price: price,
  });
  res.redirect("/shop");
}

async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/shop");
}

async function getProduct(req, res) {
  let product = await Product.findById(req.params.id);
  res.render("edit", { product: product });
}

module.exports = { getProducts, createProducts, editProduct, deleteProduct, getProduct };
