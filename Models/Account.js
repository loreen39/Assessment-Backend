const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a Username!"],
            trim: true
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Please provide a Password!"],
        }
    },
    {timestamps: true}
)

const accountModel = mongoose.model("Account",accountSchema);
module.exports = accountModel;