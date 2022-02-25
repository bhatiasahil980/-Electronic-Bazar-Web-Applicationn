const Razorpay = require('razorpay'); 
  
module.exports = (req, res) => { 
  
    // This razorpayInstance will be used to
    // access any resource from razorpay
    const razorpayInstance = new Razorpay({
    // Replace with your key_id
    key_id: 'rzp_test_kEH8sCuNnp79dR',
    // Replace with your key_secret
    key_secret: 'LoDQ5vROQK8cJvXIKR6xyBE9'
    });

    // STEP 1:
    const {amount,currency,receipt,notes}  = req.body;      
          
    // STEP 2:    
    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
          //STEP 3 & 4: 
          if(!err)
            res.json(order)
          else
            res.send(err);
        }
    )
};