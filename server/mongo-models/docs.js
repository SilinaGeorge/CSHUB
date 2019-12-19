const mongoose = require("mongoose");

// create the collection for Documents
const Schema = mongoose.Schema;

const DocSchema = new Schema({
    userId: { type: String, required: true, max:100 },
    file: { type: Buffer, required: true },
    filename: { type: String, required: true, max: 210  },
    filesize: { type: String, required: true, max:100 },
    mimetype: {type:String, required:true, max:100},
    description: { type: String, required: false, max: 210 },
    name: { type: String, required: true, max: 50 },
    topic:{ type: String, max: 50, required: true },
    dateCreate: {type: Date, required: true},
    dateModifiedString: {type: String, required: true}
});

const Docs = mongoose.model("Docs", DocSchema);

module.exports = Docs;