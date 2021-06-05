const Subscriber = require("../models/Subscriber");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

let emailController = {
    //Send Email to the User
    sendEmail: async (req,res)=>{
        const host = req.get('host');
        const email = req.body.email
        const checkEmail = await Subscriber.exists({email});
        let message = (!checkEmail) ? `Please click the link for confirmation: http://${host}/email/verify/${email}` : 'You are already our member!';
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.EMAIL_ID}`,
              pass: `${process.env.EMAIL_PASSWORD}`
            }
          });
          
        var mailOptions = {
            from: `${process.env.EMAIL_ID}`,
            to: `${email}`,
            subject: 'Confirmation Email',
            text: message
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        return res.status(200).json({status: "success", "message": "We have sent an email. Plaese Check"})
    },

    //Adds User After Email Confirmation
    addUser: async (req,res)=>{
        const email = req.params.email;
        const checkEmail = await Subscriber.exists({email:req.params.email});
        if(!checkEmail){
            const newSubscriber = new Subscriber({
                email
            })
            await newSubscriber.save();
        }
        res.redirect('http://www.google.com');
    }
};

module.exports = emailController;