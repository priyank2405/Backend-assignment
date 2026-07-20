//Task 3: Create an HTTP Server to Generate Random Numbers

// const http = require("http");

// let randomNumber = 0;

// setInterval(() => {
//   randomNumber = Math.floor(Math.random() * 100) + 1;
// }, 2000);

// const server = http.createServer((req, res) => {
//   res.end(`Ramdom Number : ${randomNumber}`);
// });

// server.listen(3000, () => {
//   console.log("Server is running....");
// });

//Task 4: Log Events Using the fs Module

const http = require("http");
const fs = require("fs");

let randomNumber = 0;

setInterval(() => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
}, 2000);

const server = http.createServer((req, res) => {
  const log = `${Date.now()} receive request for ${req.url} \n`;

  fs.appendFile("server.log", log, (err) => {
    if (err) {
      res.statusCode = 500;
      return res.end("Internal server error");
    }

    res.end(`<h1>Random Number ${randomNumber}</h1>`);
  });
});

server.listen(3000, () => {
  const log = `${Date.now()} server started\n`;
  fs.appendFile("server.log", log, (err) => {
    if (err) {
      return console.log("Error writing log");
    }
  });

  console.log("Server is running....");
});
