
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const sgMail = require('@sendgrid/mail');



router.get("/email-activate", async (req, res) => {
  
   
    const {token}= req.body;

    if (token){

      jwt.verify(token, process.env.JWT_ACC_KEY, function(err,decodedToken){

        if(err){

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
        res.json(savedUser);
      
      })
    
       
     
    
    }

    else {

return res.json({error: "Something gone wrong"})

    }


  
});




router.post("/register", async (req, res) => {
    try {
      let { email, password, passwordCheck,firstName, lastName} = req.body;

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


      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: 'thegoatlist@gmail.com',
        subject: 'Acivate your account in this link',
        html: 
      
        `<h2> Hi ${email} click on the button to verify your new account</h2>
        
        <p>${process.env.CLIENT_URL}/authentication/activate/?token=${token}</p>        
        `
        ,
      };
      
      sgMail.send(msg).then(() => {
        console.log('Message sent')
        return res.json({message: 'Email has been sent'})
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })

     
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
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
    const user = await User.findById(req.user);
    res.json({
    id: user._id,
    });
  });
  
  module.exports = router;