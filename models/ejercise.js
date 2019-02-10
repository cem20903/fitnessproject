const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ejerciseSchema = Schema({

userid: String,
ejercise: Object
})


const Ejercise = new mongoose.model('ejercise',ejerciseSchema)



module.exports = Ejercise