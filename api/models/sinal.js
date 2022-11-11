const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ClienteSchema = new Schema({
    cor: String,
    numero: Number,
    referencia: String
}, { timestamps: true });

// Export the model
module.exports = mongoose.model("sinal", ClienteSchema);
