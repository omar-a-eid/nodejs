const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    const url = req.url;

    if (url == "/favicon.ico") return res.end();

    const [operation, ...operands] = url.split("/").filter(Boolean);

    if (!operation || operands.length < 2) {
      return res.end(
        "<p>Please Enter an operatons and at least two operands ex. /add/3/4</p>"
      );
    }

    let result = +operands.shift();

    for (const operand of operands) {
      switch (operation) {
        case "add":
          result += +operand;
          break;
        case "mult":
          result *= +operand;
          break;
        case "div":
          result /= +operand;
          break;
        case "minus":
          result -= +operand;
          break;
        default:
          res.end(`Wrong operation`);

          break;
      }
    }

    try {
      await fs.writeFile("./result.txt", result.toString());
    } catch (err) {
      console.error("Error", err);
    }

    res.end(`Result: ${result}`);
  })
  .listen(7000);
