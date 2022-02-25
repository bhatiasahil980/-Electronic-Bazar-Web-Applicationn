var nodemailer = require('nodemailer');
  
module.exports = function (request, response) {
    var otp = request.body.otp;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_ID,
          pass: process.env.PASSWORD
        }
      });
      
    var mailOptions = {
        from: process.env.USER_ID,
        to: request.body.custID,
        subject: 'OTP for order confirmation',
        html: "<h1>Dear "+request.body.name+",</h1><h4>OTP for Order confimation is : </h4><h2>"+otp+"</h2><p> Thanks </p><i> Team Electronics Bazar </i>`"
    }; 

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    response.send("Email had been sent successfully !");
};