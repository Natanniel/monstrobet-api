const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ClienteSchema = new Schema({
    status: { type: Number, default: 1 }, // Inativo - 0  Ativo - 1
    email: String,
    meta : Number,
    metaBatida : Boolean

}, { timestamps: true });

// Export the model
module.exports = mongoose.model("clientes", ClienteSchema);
