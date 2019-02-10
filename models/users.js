const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
  practicSport: Array,
  training: String,
  groups: Array,
  ejercise: Array
})



const User = new mongoose.model('user',userSchema)


module.exports = User