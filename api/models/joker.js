const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ClienteSchema = new Schema({
    status : { type: Boolean, default : true } ,
    apostas : [{
        usuario: { type: mongoose.Schema.Types.ObjectId, required: false, ref: "clientes" },
        nipe : String,
        copas : Number,
        ouros : Number,
        espadas : Number,
        paus : Number
    }]
}, { timestamps: true });

// Export the model
module.exports = mongoose.model("joker", ClienteSchema);
