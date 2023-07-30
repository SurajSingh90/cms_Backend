# cms_Backend
// model auth
tokens: [{
        type: String
      }],

// login save token
const token = jwt.sign({ id: finduser._id }, "sddfkjnfskjbvfskhbvskhvbskh");
finduser.tokens = [token]
await finduser.save();

// logout 

exports.logout = async (req, res) => {
    try {
    
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Token not found" });
      }
  
      
      const token = authorizationHeader.split(' ')[1];
    
      // Find the user with the token
      const findUser = await user.findOne({ tokens: token });
      console.log("findddddddddd", findUser);
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Remove the token from the tokens array
      const newTokens = findUser.tokens.filter((t) => t !== token);
      await user.findByIdAndUpdate(findUser._id, { tokens: newTokens });
  
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  




// Otp senddddddddddddddddd
const nodemailer = require("nodemailer")
const {EMAIL,PASSWORD} = require('../env')
const Mailgen = require('mailgen')

module.exports ={
    EMAIL:"singhsuraj90901@gmail.com",
    PASSWORD:"bbcyzfhrxjfueaes"
}


    
    
  
exports.sendOtp = async(req,res)=>{
    try{
        const {email}= req.body
        const user = await User.findOne({ email });
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
        let config ={
            service:"gmail",
            auth:{
                user:EMAIL,
                pass:PASSWORD
            }
        }
        let transport = nodemailer.createTransport(config)
        let MailGenrator = new Mailgen({
            theme:"default",
            product : {
                name: "Barber",
                link : 'https://mailgen.js/'
            }
        })
        let response ={
            body:{
                // name : "Daily Tuition",
                // intro: "Your bill has arrived!",
                text: `Your One-Time Password (OTP) is: ${otp}`,
                table : {
                    data : [
                        // {
                        //     item : "Nodemailer Stack Book",
                        //     description: "A Backend application",
                        //     price : "$10.99",
                        // }
                        {
                            text: `Your One-Time Password (OTP) is: ${otp}`,
                        }
                    ]
                },
                outro: "Looking forward to do more business"
            }
        }
        let mail = MailGenrator.generate(response)
        let messages = {
            from:EMAIL,
            to:email,
            subject:"Otp Verfication",
            html:mail
        }
        transport.sendMail(messages).then(()=>{
            return res.status(200).json({message:"Otp Send Successfully"})
        }).catch(error=>{
            console.log("errrrrrrrr",error);
            return res.status(500).json({error})
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    
} 
