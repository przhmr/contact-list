
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

const nodemailer = require("nodemailer");



router.get("/email-activate", async (req, res) => {
  console.log('gotten request');
    console.log(req.query);
  
     const token= req.query.token;
              
    if (token){

      jwt.verify(token, process.env.JWT_ACC_KEY, function(err,decodedToken){

        if(err){
          console.log('link expired!');
          return res.status(400).json({error: "Incorrect or Expired Link"})

        }
        
        const { email, passwordHash, firstName, lastName}= decodedToken
        const dateCreated = Date.now()
        const newUser = new User({
          email,
          password: passwordHash,
          dateCreated,
          firstName,
          lastName,
          
          
        });
        const savedUser =   newUser.save();
        console.log('user should be saved');
        res.json(savedUser);
      
      })
    
       
     
    
    } 

   else {

    return res.json({error: "Something gone wrong"})

    } 


  
});




router.post("/register", async (req, res) => {
    try {
      let { email, password, passwordCheck,firstName, lastName} = req.body.user;

      console.log(req.body)
  
      // validate
  
      if (!email || !password || !passwordCheck)
        return res.status(400).json({ msg: "Not all fields have been entered." });
      if (password.length < 5)
        return res
          .status(400)
          .json({ msg: "The password needs to be at least 5 characters long." });
      if (password !== passwordCheck)
        return res
          .status(400)
          .json({ msg: "Enter the same password ." });
  
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      
      const token = jwt.sign({email,passwordHash, firstName, lastName}, process.env.JWT_ACC_KEY, {expiresIn:'20m'})
      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c4f41d0d1f624a",
          pass: "8bc87dca8d22da"
        }
      });
   

var mailOptions = {
  from: '"Example Team" <thegoat@example.com>',
  to: email,
  subject: 'Activate your new account :)',
  text: 'Hey there, it’s our first message sent with Nodemailer ',
  html:  `<h2> Hi ${firstName} click on the button to verify your new account</h2>
        
        <p>${process.env.CLIENT_URL}/authentication/activate/?token=${token}</p>        
        `,
  
};

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
});
      
      

     
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body.user;
  
      // validate
      if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        token,
        user: {
          id: user._id,
          storeName: user.storeName,
          storeLogo: user.storeLogo,
        },
      });

     


    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.patch("/:id", auth, async (req, res) => {

    try {

        const user = await User.find(
            {userId: req.user, _id: req.params_id}) 
        if(!user)
        res.status(400).json({msg: "Not found with this ID"})

        const updatedUser = await User.findByIdAndUpdate({ _id: req.params.id },{

            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
                      
        }
         )

        const savedUser = await updatedUser.save() 
        res.json(savedUser)
    }

catch(err){

    
    res.status(500).json({error: err.message})

}

   
  });



  
  router.delete("/delete", auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



  
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  router.put('/updatePassword', auth, async (req, res) => {
    
    try {
        
    }
    catch (err) {
       
        res.status(400);
        
    }});




router.post('/passwordResetRequest', async (req, res) => {
    

    try {
        
    }
    catch (err) {
        
        res.send(500);
    }
});
router.post('/passwordReset', async (req, res) => {
   
    try {
        
    }
    catch (err) {
        
        res.send(ex, 500);
    }
});



  
  router.get("/", auth, async (req, res) => {
    const user = await User.find({UserId: req.user});
    res.json({
    id: user._id,
    });
  });
  
  module.exports = router;