const http = require("http");
const fs = require("fs");

http
  .createServer(function (req, res) {
    let url = req.url;
    if (url != "/favicon.ico") {
      let urlParts = url.split("/");

      if (urlParts.length < 4) {
        res.write(
          "<p>Please Enter an operatons and at least two operands ex. /add/3/4</p>"
        );
      } else {
        let operation = urlParts[1];
        let result = +urlParts[2];

        for (let i = 3; i < urlParts.length; i++) {
          if (urlParts[i]) {
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
        }
        fs.writeFile("./result.txt", result.toString(), (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.write(`Result: ${result}`);
      }
    }
    res.end();
  })
  .listen(7000);
