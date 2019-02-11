const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const groupsSchema = Schema({

name: String,
members: 

})


const groups = new mongoose.model('groups',groupsSchema)



module.exports = groups