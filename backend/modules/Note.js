const mongoose = require('mongoose');
const {Schema } = mongoose;

const Noteschema = new Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
  title :{
      type : String,
      require : true
  },
  description :{
      type : String,
      require : true
  },
  tag :{
      type : String,
  },
  date :{
      type : Date,
      default : Date.now
  }


})

module.exports = mongoose.model('note', Noteschema)