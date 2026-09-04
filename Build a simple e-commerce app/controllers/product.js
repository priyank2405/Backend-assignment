const Product = require('../models/prodect');

async function getproducts(req,res){
    let products = await Product.find()
    res.render('index', {products:products})
}

async function addproduct(req,res){
    let {image, name, description, price} = req.body;
    await Product.create({
        image:image,
        name:name,
        description:description,
        price:price,
        createdBy:req.user._id,
    }),
    res.redirect('/shop')
}

async function deleteProduct(req,res){
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/shop')
}

async function editproduct(req,res){
    let {image, name, description, price} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
        image : image,
        name : name,
        description: description, 
        price: price,
    })
    res.redirect('/shop')
}

async function getProduct(req, res) {
    let product = await Product.findById(req.params.id);

    res.render('edit', {
        product: product
    });
}



module.exports = {getproducts, addproduct, deleteProduct, editproduct, getProduct}