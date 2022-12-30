const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");

class App {

  constructor() {
    this.server = express();
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors());

    let db_string = "mongodb+srv://superuserprovision:Z5rUXK6Mm6DmHM6t@cluster0.vfchy.mongodb.net/monstrobet?retryWrites=true&w=majority";

    mongoose.connect(db_string, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    this.middlewares();
    this.routes();
  }

  middlewares() {

    this.server.use((req, res, next) => {
      try {

        req.jwt = jwt;
        var token = req.headers["x-access-token"];
        //console.log(req.headers)
        //    console.log(req)
        //console.log(token)
        if (token && token != undefined && token != 'undefined') {
          jwt.verify(token, "b03e148fc2d70bb33bfbbf15b7eee9e7", function (err, decoded) {
            if (err) {
              console.log(err);
              return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
            }
            req.id = ObjectID(decoded.usuario);
            next();
          })
        } else {
          next();
        }
      } catch {
        next();
      }
    })

  }

  routes() {
    this.server.use(require('./api/routes/clientes'))
    this.server.use(require('./api/routes/servidor'))
    this.server.use(require('./api/routes/joker'))


    // this.server.use(require('./src/routes/maquinas'));
    // this.server.use(require('./src/routes/usuario'))
  }
}

module.exports = new App().server