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
  
