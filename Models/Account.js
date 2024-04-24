const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a Username!"],
            trim: true,
            validate: {
                validator: function(value){
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: "Invalid username format",
            },
        },
        password: {
            type: String,
            trim: true,
            required: [true, "Please provide a Password!"],
            validate: {
                validator: function(value){
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",<.>\/?\\[\]`~])(.{8,})$/.test(value);
                },
                message: "Invalid password format",
            },
        },
        role: {
            type: Number,
            trim: true,
            required: true,
        },
        verificationToken: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

const accountModel = mongoose.model("Account",accountSchema);
module.exports = accountModel;