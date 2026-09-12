const App = require('../models/app');


async function getExpenses(req,res) {
    let expenses = await App.find({})
    res.render('index', {expenses:expenses})
}


async function createExpenses(req,res){
    let {title, amount, category, date} = req.body;
     await App.create({
        title, amount, category, date
    })
    res.redirect('/app')
}

async function editExpenses(req,res) {
    let {title, amount, category, date} = req.body;
    await App.findByIdAndUpdate(req.params.id, {
        title:title,
        amount: amount,
        category:category,
        date:date
    },{
        new:true
    })
       res.redirect('/app')
}

async function editExpense(req,res){
    let expense = await App.findById(req.params.id)
    res.render('edit', {expense})
}

async function deleteExpenses(req,res) {
    await App.findByIdAndDelete(req.params.id)
    res.redirect('/app')
}

module.exports = {getExpenses, createExpenses, editExpenses, editExpense, deleteExpenses}