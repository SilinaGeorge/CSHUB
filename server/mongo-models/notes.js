const mongoose = require("mongoose");

// create the collection for Users
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    userId: { type: String, required: true, max:100 },
    content: { type: String, required: true, max:5000000 },
    description: { type: String, required: false, max: 210 },
    name: { type: String, required: true, max: 50 },
    topic:{ type: String, max: 50, required: true },
    dateCreate: {type: Date, required: true},
    dateModifiedString: {type: String, required: true},
    size: {type:Number, required: true}
});

NoteSchema.index({dateCreate: -1})
const Notes = mongoose.model("Notes", NoteSchema);

Notes.createIndexes({dateCreate: -1})

module.exports = Notes;