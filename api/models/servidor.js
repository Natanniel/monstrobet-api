const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ClienteSchema = new Schema({
    status: { type: Number, default : 1 }, // Inativo - 0  Ativo - 1
    nome: String,
    ping: Date,
    clientes: [{
        id: String
    }]
}, { timestamps: true });

// Export the model
module.exports = mongoose.model("servidor", ClienteSchema);
