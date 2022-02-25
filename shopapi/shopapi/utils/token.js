const jwt = require('jsonwebtoken');

module.exports = {
    secret : process.env.SECRET,
    generateToken(emailid){
        let tokenid = jwt.sign({userid:emailid},this.secret,{expiresIn: "1h"});
        return tokenid;
    },

    verifyToken(tokenid){
        try{
            let decode = jwt.verify(tokenid,this.secret);
            if(decode && decode.userid){
                return true;
            }
            else{
                return false;
            }
        }catch(err){
            console.log("VERIFY TOKEN ",err);
            return false;
        }
    }
}