const express= require("express");
const cors = require("cors");
const mongoose = require ("mongoose");
const bodyParser = require('body-parser');
require("dotenv").config();

//Set express

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log('The server has started on port : 5000' ));


//bodyparser
app.use(bodyParser.json()),
app.use(bodyParser.urlencoded({ extended: true })),

//Set up mongoose

mongoose.connect(process.env.MONGO_URI, {

useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex: true,

}, (err)=> {

if (err) throw err;
console.log("MongoDB connection established :)");


},




// set up routers
app.use("/users", require("./routes/userRouter")));
app.use("/contacts", require("./routes/contactRouter"));