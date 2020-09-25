var fs = require("fs");
var util = require("util");

var express = require("express");
var app = express();
var port = 9000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("static"));
// pour que node puisse fournir les fichiers contenus dans static

app.get("/test", function (req, res) {
  res.send({ mess: "test" });
});

app.post("/test", function (req, res) {
  res.send({ mess: "test" });
});

// lancement du serveur

var server = app.listen(port, function () {
  console.log("Express server listening on port " + port);
});

// partie websockets

var WebSocket = require("ws");

var clients = [];

var wss = new WebSocket.Server({ port: 9100 });
console.log("Websocket server listening on port 9100");

wss.on("connection", (ws) => {
  clients.push(ws);
  console.log("WS connection OK");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send("Le serveur a reçu : " + message);
    diffusion(message);
  });
});

function diffusion(mess) {
  clients.forEach(function (c) {
    c.send("diffusion : " + mess);
  });
}
