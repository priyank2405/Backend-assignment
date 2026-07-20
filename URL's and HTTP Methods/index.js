//URL Parameters and HTTP Methods - Assignments

const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end();
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  let log = `Timestamp: ${Date.now()} URL: ${req.url} Parameters: ${JSON.stringify(myUrl.query)}\n`;
  fs.appendFile("log.txt", log, () => {
    switch (myUrl.pathname) {
      case "/":
      case "/home":
        const userName = myUrl.query.username || "Guest";
        res.end(`<h1>Hello, ${userName}</h1>`);
        break;
      case "/profile":
        res.end("welcome to your profile");
        break;
      case "/search":
        const q = myUrl.query.q || "";
        res.end(`<h1>Hey! you are searching for ${q}</h1>`);
        break;
      case "/about":
        res.end("Welcome to the About page");
        break;
      case "/contact":  
        res.end("Contact US");
        break;
      default:
        res.end("404 not found");
    }
  });
});

server.listen(3000, () => {
  console.log("server is running on the port 3000");
});
