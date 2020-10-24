const router = require("express").Router()
const auth = require("../middleware/auth")
const Contact = require("../models/contactModel")
const nodemailer = require("nodemailer");


router.post("/", auth, async (req, res) => {

    try {

     
        
        let {email, firstName, lastName, contactNumber}= req.body.contacts;
        
       console.log(email)

        //validation

        if ( !email | !firstName | !lastName | !contactNumber )
        {
        console.log("Aqui esta el error")
        
        console.log(email)
        console.log(firstName)
        console.log(lastName)
        console.log(contactNumber)
        
        return res.status(400).json({ msg: "Not all Contact Info entered" });
        }

       
        
        const existingContact = await Contact.findOne({ email: email });
      if (existingContact){

        return res
          .status(400)
          .json({ msg: "A contact with this email already exists." });

      }
        
        const newContact = new Contact({

            
            email,
            firstName,
            lastName,
            contactNumber,
            contactId: req.contact,
        });


        const savedContact = await newContact.save();
        res.json(savedContact);
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "0b659c6ce0b4e2",
              pass: "382c4a083f8e37"
            }
          });
    
       
    
    var mailOptions = {
      from: '"Example Team" <thegoat@example.com>',
      to: email,
      subject: 'Conntact Added!',
       
      html:  `<h1> Hi ${firstName}</h1>
            
            <p>We added you in our contact list. Thank you.</p>        
            `,
      
    };
    
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
        
    }

catch(err){
    console.log(err)
    res.status(500).json({error: err.message})
   
}

   
  });

  

  router.get("/all",auth,  async (req, res) => {

    try {

        const contacts = await Contact.find({ContactId: req.contact})
        res.json(contacts);
    }

catch(err){

    res.status(500).json({error: err.message})

}

   
  });


  
  router.patch("/:id", auth, async (req, res) => {

    try {

        const contact = await Contact.find(
            {contactId: req.contact, _id: req.params_id}) 
        if(!contact)
        res.status(400).json({msg: "Not found with this ID"})

        const updatedContact = await Contact.findByIdAndUpdate({ _id: req.params.id },{

            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            contactNumber: req.body.contactNumber,
          

        }
         )

        const savedContact = await updatedContact.save() 
        res.json(savedContact)
    }

catch(err){

    
    res.status(500).json({error: err.message})

}

   
  });
  


  router.delete("/:id", async (req, res) => {

    try {   
        
        console.log ("test test test")

        const contact = await Contact.find(
            {userId: req.user, _id: req.params_id}) 
        if(!contact)
        res.status(400).json({msg: "Not found with this ID"})

        const deletedContact= await Contact.findByIdAndDelete(req.params.id)
        res.json(deletedContact)

        console.log("paso completado")

    }

catch(err){

    res.status(500).json({error: err.message})
    console.log("Hay un error")

}

   
  });






module.exports = router;