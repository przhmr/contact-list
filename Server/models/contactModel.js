const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

email:{
    type: String,
    required: true,
    unique: true
},


lastName:{
 type: String,

},

firstName:{
    type: String,
   
   },

contactNumber:{

    type: String,

},

dateCreated: {

type: Date,

},





});

module.exports= Contact = mongoose.model("contact", contactSchema)