const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb+srv://Blossomswilt:Spineworld2@booksearch.sr4slvp.mongodb.net/?retryWrites=true&w=majority"
);

module.exports = mongoose.connection;
