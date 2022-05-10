const mongoose = require('mongoose');
const {Schema } = mongoose;

const Userschema = new Schema({
  name :{
      type : String,
      require : true
  },
  email :{
      type : String,
      require : true,
      unique : true
  },
  password :{
      type:String,
      require : true
  },
  date :{
      type : Date,
      default : Date.now
  }
})

const user = mongoose.model('users', Userschema);
user.createIndexes()
module.exports = user;