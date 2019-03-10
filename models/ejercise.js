const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ejerciseSchema = Schema({

userid: String,
ejercise: Object,
date: { type: Date, default: Date.now }
})


const Ejercise = new mongoose.model('ejercise',ejerciseSchema)



module.exports = Ejercise