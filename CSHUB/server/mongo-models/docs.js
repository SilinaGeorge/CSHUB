const mongoose = require("mongoose");

// create the collection for Users
const Schema = mongoose.Schema;

const DocSchema = new Schema({
    userId: { type: String, required: false },
    file: { type: Buffer, required: true },
    description: { type: String, required: false, max: 210 },
    name: { type: String, required: false, max: 50 },
    topic:{ type: String, max: 50, required: false },
    dateCreate: {type: Date, required: false},
    dateModifiedString: {type: String, required: false}
});

const Docs = mongoose.model("Docs", DocSchema);

module.exports = Docs;