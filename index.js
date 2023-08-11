const porta = 8080;
const express = require("express");

const locales = require("./base/locales.json");
const weather = require("./base/weather.json");

const servidor = express();
const app = servidor;

servidor.use(express.static(__dirname + "/"));

servidor.engine("html", require("ejs").renderFile);
servidor.set("view engine", "html");

servidor.get("/", function (req, res) {
  res.render("index"); // carrega ./views/index.html
});

servidor.get("/about", function (req, res) {
  res.render("about"); // carrega ./views/about.html
});

app.get("/locales", (req, res) => {
  res.send(locales);
});

app.get("/locales/:id", (req, res) => {
  res.send(locales[req.params.id]);
});

servidor.listen(porta, () => {
  console.log(`Server is running on port ${porta}`);
});