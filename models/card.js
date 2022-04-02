const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  id: {
    type: Number,
    ref: 'card',
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
    },
  },
});

module.exports = mongoose.model('card', cardSchema);
