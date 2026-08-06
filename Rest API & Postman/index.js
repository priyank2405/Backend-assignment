const express = require("express");
const app = express();
const users = require('./users.json')


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send('You are at wrong URL! check users or api/users')
})

app.get('/users', (req,res) => {
    res.render('users', {users})
})

app.get('/api/users', (req,res) =>{
    return res.json(users);
})
app.get('/api/users/:id', (req,res) =>{
    let userId = Number(req.params.id)
    let user = users.find((user)=> user.id === userId);
    return res.json(user);
})
app.use((req,res) => {
    res.status(404).render('error')
})

app.listen(3000, () => {
  console.log("Server is running");
});
