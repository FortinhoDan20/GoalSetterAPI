const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    },
    text: {
      type: String,
      required: [true, 'Please add text value']
    }
}, {
  timestamps: true
})

const Goal = mongoose.model('Goal', goalSchema)
module.exports = Goal
