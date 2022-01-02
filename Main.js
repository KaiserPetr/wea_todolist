const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/todolist-data.json');
const middlewares = jsonServer.defaults();
const Router = require("./Router");

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

//database connection
const db = mysql.createConnection({
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b642b39277b5f8",
  password: "7e1f7e2c",
  database: "heroku_09857087acdc930",
});

db.connect(function (err) {
  if (err) {
    console.log("DB error");
    throw err;
    return false;
  }
});

const sessionStore = new MySQLStore(
  {
    expiration: 1825 * 86400 * 1000,
    endConnectionOnClose: false,
  },
  db
);

app.use(
  session({
    key: "h4t61rtgh854er8g416e3fger56",
    secret: "g1erg5er1g5re4g13wfdw",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1825 * 86400 * 1000,
      httpOnly: false,
    },
  })
);

new Router(app, db);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.use(middlewares);
server.use(router);

server.listen(process.env.PORT || 8000, function(){
  console.log("json server listening on port %d in %s mode", this.address().port, server.settings.env);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
