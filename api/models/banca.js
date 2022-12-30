const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ClienteSchema = new Schema({
    casa : {type:Number, default : 0},
    lucro : {type:Number, default : 0},
    jackpotJoker : {type:Number, default : 0}
}, { timestamps: true });

// Export the model
module.exports = mongoose.model("banca", ClienteSchema);
