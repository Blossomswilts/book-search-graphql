const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI ||
        "mongodb+srv://Blossomswilt:password@cluster0.sr4slvp.mongodb.net/test?retryWrites=true&w=majority"
)

module.exports = mongoose.connection;
