const express = require("express");
const fs = require("fs").promises;
const querystring = require("querystring");

const app = express();

app.get("/", async (req, res) => {
  try {
    const mainHTML = await fs.readFile("./pages/main.html");
    res.setHeader("Content-Type", "text/html");
    res.send(mainHTML);
  } catch (error) {
    console.error("Error reading main HTML:", error);
  }
});

app.get("/styles/style.css", async (req, res) => {
  try {
    const mainCSS = await fs.readFile("./styles/style.css");
    res.setHeader("Content-Type", "text/css");
    res.send(mainCSS);
  } catch (error) {
    console.error("Error reading CSS file:", error);
  }
});

app.get("/scripts/main.js", async (req, res) => {
  try {
    const mainJS = await fs.readFile("./scripts/main.js");
    res.setHeader("Content-Type", "text/javascript");
    res.send(mainJS);
  } catch (error) {
    console.error("Error reading JavaScript file:", error);
  }
});

app.get("/welcome.html", async (req, res) => {
  try {
    const welcomeHTML = await fs.readFile("./pages/welcome.html", "utf8");
    res.setHeader("Content-Type", "text/html");
    res.send(welcomeHTML);
  } catch (error) {
    console.error("Error reading welcome HTML:", error);
  }
});
app.get("/clientData.json", async (req, res) => {
  try {
    const json = await fs.readFile("./clientData.json", "utf8");
    res.setHeader("Content-Type", "text/json");
    res.send(json);
  } catch (error) {
    console.error("Error reading welcome HTML:", error);
  }
});

app.post("/", async (req, res) => {
  let formData = "";

  req.on("data", (data) => {
    formData += data;
  });

  req.on("end", async () => {
    const parsedData = querystring.parse(formData);

    try {
      const welcomeHTML = await fs.readFile("./pages/welcome.html", "utf8");
      let fileContent = welcomeHTML
        .replace("{clientName}", parsedData.name)
        .replace("{mobileNumber}", parsedData.mobile)
        .replace("{address}", parsedData.addr)
        .replace("{email}", parsedData.email);

      res.setHeader("Content-Type", "text/html");
      res.send(fileContent);
    } catch (error) {
      console.error("Error reading welcome HTML:", error);
    }

    try {
      const oldData = await fs.readFile("./clientData.json", "utf8");
      const data = JSON.parse(oldData || "[]");

      data.push(parsedData);
      await fs.writeFile("./clientData.json", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing client data:", error);
    }
  });

  req.on("error", (error) => {
    console.error("Request error:", error);
  });
});

app.all("*", (req, res) => {
  res.status(404).send("Invalid URL!");
});

app.listen(7000);
