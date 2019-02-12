const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const groupsSchema = Schema({

name: String,
members: [{ type: Schema.Types.ObjectId, ref: "Ejercise"}],

})


const groups = new mongoose.model('groups',groupsSchema)


module.exports = groups