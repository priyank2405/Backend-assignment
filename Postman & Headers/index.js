  const express = require("express");
  const app = express();
  const fs = require('fs');

  const users = require("./users.json");
  app.set("view engine", "ejs");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/users", (req, res) => {
    res.render("users", { users });
  });
  app.get("/api/users", (req, res) => {
    return res.json(users);
  });
  app.post("/api/users", (req, res) => {
    let user = req.body;
    console.log("Received data:", user);

    users.push({id: users.length + 1, ...user})
    fs.writeFile('./users.json', JSON.stringify(users,null,2), (err) =>{
      if(err){
        console.log(err);
        return res.status(500).json({error: 'Error saving user'});
      }
      return res.json("users added");
    })
    
  });

  app.get("/api/users/:id", (req, res) => {
    let id = Number(req.params.id);
    let user = users.find((user) => user.id === id);
    return res.json(user);
  });

  app.patch('/api/users/:id', (req,res) =>{
    let id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = {...users[userIndex], ...req.body};
    fs.writeFile('./users.json', JSON.stringify(users, null,2), (err) =>{
      return  res.json({message: 'User updated', user: users[userIndex]})
    })
  })

  app.delete('/api/users/:id', (req,res) =>{
    let id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    const deleteUser = users.splice(userIndex, 1);

    fs.writeFile('./users.json', JSON.stringify(users,null, 2), (err) =>{
    return res.json({user: deleteUser[0]});
    })
  })

  app.listen(3000, () => {
    console.log("Server is running");
  });
