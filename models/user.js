const mongoose = require('mongoose')
const validator = require('validator')
const nodemailer = require('nodemailer')

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
            
        }
    },
    message:{
        type:String,
        required:true
    }
})
userSchema.post('save',async function(){
    const user = this
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your email id',
          pass: 'your password'
        }
      });
      var mailOptions = {
        from: 'youremailid',
        to: 'reciever emailid',
        subject: 'Sending Email using Node.js',
        // html: '<h1>You have recieved a new querry</h1><p></p>',
        // text:user.name,
        // text: 'For clients with plaintext support only',
        // html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
 
        // html: '<h1>Name:</h1>',
        
        html: `<h1>Name:${user.name}</h1>
                <h1>Email:${user.email}</h1>
                <h1>Description:${user.message}</h1>`,
        // text:user.email,
        // html: '<h1>Description:</h1>',
        // text: 'Descrition:' + user.description,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    console.log('just before')
    
})
const User = mongoose.model('User',userSchema)
module.exports = User