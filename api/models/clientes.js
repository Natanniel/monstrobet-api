const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ClienteSchema = new Schema({
    status: { type: Number, default: 1 }, // Inativo - 0  Ativo - 1
    nome: String,
    email: String,
    senha: String,
    funcao: String, // Funcao no telegram
    teste: Boolean, // 
    plano: Number,
    admin: Boolean,
    pediuSuporte: { type: Boolean, default: false },
    operacao: {
        // 0 inativo / 1 - aguardando senha blaze / 2 - Aguardando operacao / 3 - Operando 
        status: { type: Number, default: 0 },
        meta: Number,
    },
    configuracao: {
        crash: Boolean,
        double: Boolean,
        recuperacao: {
            status: Boolean,
            quantidade: Number
        }
    }

}, { timestamps: true });

// Export the model
module.exports = mongoose.model("clientes", ClienteSchema);
