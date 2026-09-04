const express = require("express");
const routes = express.Router();

const checkAuth = require('../middleware/authUser')
const {getproducts, addproduct, getProduct, editproduct, deleteProduct} = require("../controllers/product");

routes.get("/", getproducts);
routes.post("/",checkAuth, addproduct);
routes.get('/:id/edit',checkAuth, getProduct);
routes.post('/:id/edit',checkAuth, editproduct);
routes.get("/:id/delete",checkAuth, deleteProduct);


module.exports = routes;
