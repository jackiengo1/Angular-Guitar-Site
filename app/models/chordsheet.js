var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ChordSheetSchema   = new Schema({
    email: String,
    title: String,
    version: Number,
    chordString: String,
    isVisible: Boolean,
    date: String
});

module.exports = mongoose.model('ChordSheet', ChordSheetSchema);