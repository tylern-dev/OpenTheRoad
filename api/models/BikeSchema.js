const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
  size:{
    type: String,
    required: true
  },
  fleet:{
    type: String,
    enum: ['eTap', 'eTapHRD', '1x'],
    required: true
  },
  make:{
    type: String
  },
  model: {
    type:String
  },
  wheelSet:{
    model: {
      type:String
    }
  }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;