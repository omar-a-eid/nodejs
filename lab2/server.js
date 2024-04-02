const http = require("http");
const fs = require("fs").promises;
const querystring = require("querystring");

http
  .createServer(async (req, res) => {
    try {
      var mainHTML = await fs.readFile("./pages/main.html");
      var mainCSS = await fs.readFile("./styles/style.css");
      var mainJS = await fs.readFile("./scripts/main.js");
      var welcomeHTML = await fs.readFile("./pages/welcome.html", "utf8");
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }

    let path = req.url;
    let method = req.method;

    if (method === "GET") {
      switch (path) {
        case "/":
        case "/main.html":
          res.setHeader("Content-Type", "text/html");
          res.write(mainHTML);
          break;
        case "/styles/style.css":
          res.setHeader("Content-Type", "text/css");
          res.write(mainCSS);
          break;
        case "/scripts/main.js":
          res.setHeader("Content-Type", "text/javascript");
          res.write(mainJS);
          break;
        default:
          if (path.includes("welcome.html")) {
            res.setHeader("Content-Type", "text/html");
            res.write(welcomeHTML);
          } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("Invalid URL !!");
          }
      }
      res.end();
    } else if (method === "POST") {
      let formData = "";

      req.on("data", (data) => {
        formData += data;
      });

      req.on("end", () => {
        const parsedData = querystring.parse(formData);
        const name = parsedData.name;
        const mobile = parsedData.mobile;
        const addr = parsedData.addr;
        const email = parsedData.email;

        let fileContent = welcomeHTML
          .replace("{clientName}", name)
          .replace("{mobileNumber}", mobile)
          .replace("{address}", addr)
          .replace("{email}", email);

        res.setHeader("Content-Type", "text/html");
        res.write(fileContent);
        res.end();
      });

      req.on("error", (error) => {
        console.error("Request error:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      });
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Check your method only GET and POST");
    }
  })
  .listen(7000);
