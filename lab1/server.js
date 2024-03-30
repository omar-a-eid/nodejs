const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async function (req, res) {
    const url = req.url;

    if (url == "/favicon.ico") {
      res.end();
      return;
    }

    const urlParts = url.split("/");
    if (urlParts.length < 4) {
      res.write(
        "<p>Please Enter an operatons and at least two operands ex. /add/3/4</p>"
      );
      res.end();
      return;
    }

    const operation = urlParts[1];
    let result = +urlParts[2];

    for (let i = 3; i < urlParts.length; i++) {
      let operand = +urlParts[i];
      switch (operation) {
        case "add":
          result += operand;
          break;
        case "mult":
          result *= operand;
          break;
        case "div":
          result /= operand;
          break;
        case "minus":
          result -= operand;
          break;
        default:
          break;
      }
    }

    try {
      await fs.writeFile("./result.txt", result.toString());
    } catch (err) {
      console.error("Error", err);
    }

    res.write(`Result: ${result}`);
    res.end();
  })
  .listen(7000);
