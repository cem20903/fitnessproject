const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
  practicSport: Array,
  groups: Array,
  weight: Array,
  ejercise: [{type: Schema.Types.ObjectId, ref:"ejercise" }]
})


const User = new mongoose.model('user',userSchema)

module.exports = User