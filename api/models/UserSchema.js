const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,

  },
  phone: {
    type: String
  },
  isAdult:{
    type: String,
  },
  homeAddress: {
    streetAddress: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    }
  },
  password: {
    type: String,
    required: true
  },
  pwResetRequired: {
    type: String,
    default: false
  },
  role: {
    type: String,
    enum: ['admin','customer','mechanic'],
    default: 'customer',
    required: true
  },
  measurements:{
    reach:{
      type: Number,

    },
    saddleHeight:{
      type: Number,

    }
  },

  eventsSignedUpFor:[{
    event:{ type: Schema.Types.ObjectId, ref: 'BikeEvent'},
    bike: {type: Schema.Types.ObjectId, ref: 'Bike'},
    // DATE FIELD ???
  }]

});


const User = mongoose.model('User', userSchema);

module.exports = User;