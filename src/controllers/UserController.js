import userModel from "../models/User.js";

export  async function getUserController(req,res){
    try {
        const currUserID = req._id;
        const user = await userModel.findOne({_id:currUserID}).populate('Achievments').populate('Levels');
        if(!user){
            return res.send("user not found!");
        }
        return res.send(user);
    } catch (error) {
        return res.send(error.message);
    }
} 

export async function getAllUsersController(req, res) {
    try {
      // Retrieve all users
      const users = await userModel.find().populate('Achievments').populate('Levels');
  
      if (!users || users.length === 0) {
        return res.send("No users found!");
      }
  
      return res.send(users);
    } catch (error) {
      return res.send(error.message);
    }
  }
  export async function searchUserController (req, res)  {
    try {
      const searchTerm = req.query.term;
  
      // Use a regular expression to perform a case-insensitive search
      const users = await userModel.find({ name: { $regex: new RegExp(searchTerm, 'i') } });
  
      res.json(users);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
  
 export async function  fcmTokenController  (req,res)  {
  
        
        const { _id } = req.params;
        const { fcmToken } = req.body;
     try {
      const user = await userModel.findById( _id );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Add the FCM token to the user's document
      console.log('FCM Token:', fcmToken);
      user.fcmTokens.push(fcmToken);
    
      // Save the updated user document
      await user.save();
  
      res.json({ message: 'FCM token added successfully' });
    
     } catch (error) {
      console.error('Error adding FCM token:', error);
      res.status(500).json({ error: 'Internal server error' })
     }

  }
  
  
  