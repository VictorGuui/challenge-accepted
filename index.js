/*
    Arquivo: ./index.js
    Função: Iniciar o app web
    npm run start
*/

const porta = 8080;
const express = require("express");

const locales = require("./base/locales.json");
const raw_weather = require("./base/weather.json");

const weather = [];

for (let value of raw_weather) {
  key = value.locale.id;
  weather[key] = value;
}

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {res.send("still awake")})
app.get("/locales", (req, res) => {
  res.send(locales);
});

app.get("/weather/:id", (req, res) => {
  data_weather = weather[req.params.id];
  if (data_weather != undefined) {
    res.send(data_weather);
  } else {
    res.status(404).send("sorry");
  }
});

app.get("/locales/:id", (req, res) => {
  res.send(locales[req.params.id]);
});

app.listen(porta);