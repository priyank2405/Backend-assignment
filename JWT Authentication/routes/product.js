const express = require('express');
const routes = express.Router();

const checkAuth = require('../middleware/checkAuth')

const {getProducts, createProducts, editProduct, deleteProduct,getProduct} = require('../controllers/product')


routes.get('/', getProducts);
routes.post('/', checkAuth, createProducts);
routes.get('/:id/edit',checkAuth, getProduct);
routes.post('/:id/edit',checkAuth, editProduct)
routes.get('/:id/delete',checkAuth, deleteProduct)



module.exports = routes;