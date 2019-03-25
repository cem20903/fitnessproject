const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  email: String,
  password: String,
  practicSport: Array,
  genre: {type: String, enum: ['male', 'female']},
  records: Object,
  groups: Array,
  weight: Array,
  goalWeight: Number,
  ejercise: [{type: Schema.Types.ObjectId, ref:"ejercise" }]
})


const User = new mongoose.model('user',userSchema)

module.exports = User