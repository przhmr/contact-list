const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

email:{
    type: String,
    required: true,
    unique: true
},


password:{
    type: String,
    required: true,
 
},

lastName:{
 type: String,

},

firstName:{
    type: String,
   
   },



dateCreated: {

type: Date,

},





});

module.exports= User = mongoose.model("user", userSchema)