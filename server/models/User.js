const mongoose = require('mongoose');
const { stringify } = require('uuid');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, require: true},
        username: { type: String, require: true },
        password: { type: String, require: true },
        sessions:[{
            createdAt: { type: Date, require:true }
        }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("user", UserSchema);