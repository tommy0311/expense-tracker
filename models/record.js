const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)