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
    Subject:{
        type: String,
        required:true,
    },
    Description:{
        type:String,
        required:true
    }
})
userSchema.post('save',async function(){
    const user = this
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shreyagarwal611@gmail.com',
          pass: '91220142015hey'
        }
      });
      var mailOptions = {
        from: 'shreyagarwal611@gmail.com',
        to: 'shreyagarwal611@gmail.com',
        subject: 'Sending Email using Node.js',
        html: `<h1>Name:${user.name}</h1>
                <h1>Email:${user.email}</h1>
                <h1>Description:${user.Description}</h1>`,
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