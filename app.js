const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

class App {

  constructor() {
    this.server = express();
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cors());

    let db_string = "mongodb+srv://superuserprovision:Z5rUXK6Mm6DmHM6t@cluster0.vfchy.mongodb.net/rzblaze?retryWrites=true&w=majority";

    mongoose.connect(db_string, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    
    this.middlewares();
    this.routes();
  }

  middlewares() {

  }

  routes() {
    this.server.use(require('./api/routes/clientes'))
    this.server.use(require('./api/routes/servidor'))
   // this.server.use(require('./src/routes/maquinas'));
   // this.server.use(require('./src/routes/usuario'))
  }
}

module.exports = new App().server