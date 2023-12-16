import adminModel from "../models/Admin.js"
import userModel from "../models/User.js";
import { getMessaging } from "firebase-admin/messaging";

export async function adminSignupController(req,res){
    try {
        const {username,password,email} = req.body;
        if(!username || !password || !email){
            return res.send({message:"all fields are required"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        req.body["password"] = hashedPassword;
        const user = await adminModel.create(req.body);
        const  newuser = await adminModel.findById(user._id);
        return res.send({newuser});

    } catch (error) {
        return res.send({'error':error.message});
    }

}
export async function adminLoginController(req,res){
  try {
    console.log('login');
    const {usernameOrEmail,password} = req.body;
    const user = await adminModel.findOne({
        $or:[{username:usernameOrEmail}, {email:usernameOrEmail}]
    });
    if(!user){
        return res.status(404).json({message:"user not found"});
    }

    const matched = await bcrypt.compare(password,user.password);
    if(!matched){
        return res.send({message:"incorrect password"});
    }

    const accessToken = generateAccessToken({...user})
    // const {_id,password,newuser} = user;
    delete user['_doc']['password'];
    delete user['_doc']['__v'];
    delete user._doc['_id'];
    // console.log(user);

    return res.send({...user._doc,"accessToken":accessToken});
    
} catch (error) {
    return res.json({"error":error.message});
}


}

const generateAccessToken = (data) => {
    try {
      const token = Jwt.sign(data, ACCESS_SECRET_KEY, {
        expiresIn: "30d",
      });
      return token;
    } catch (e) {
      console.log(e.message);
  }
}




export async function sendNotification(req,res){
    try {
        /*const token1 = 'e0FOYutEbtu1F6fLdYPB1J:APA91bFAWMTrmWRD3xwfrOnh02I9r-cK5uEcKBkI8A7OwKVyTW7BBezf_cWFv-jPXTYB7dUsI1QU_AQQeHtyNoG8OKM4pxiYSZaaljjBW0naVp5bO0s5x4x2m58kSlv5svmvqIX-FIRz';*/
       /* const token2 = "fwPCsin9HypD9iiWs1cGuV:APA91bGPAKDelHjkROEyQFaZ6MapR4qwSNfMaRALc-l4IUuDDxNd-bEb3jHMTiU5or4W6UJ-OWUbOOmaHBRc-IYFpflfvZAb7M_R7mDgsqPT_M0zXu7R1jegWcaTVZhVU48YN4QdZGoX";*/
      const  token = "fHfGbzN1cS_ucQ5CA3wuBs:APA91bEkMvW_WyXs5ONiW0iH9cFvufOcMzzDGQZi6fUcPLyu2mnzxuGf2OilXwj5q5lgUfWhFAdvrpxMuiH0MLdDWxFJ_ayHJ2UP-rq368spfRBZfLGZTvt_SZUWxELDgCCAe2pJwiLN";

        const message = {
            notification:{
                title:"This is a Notification from brick-blaster",
                body:"level 92 is ready for you !"
            },
            token
        }
        console.log("hyyy")
        const result = await getMessaging().sendMulticast(message);
        return res.send({'status':'successfully sent',result});
    } catch (error) {
        console.log(error.message)
        return res.send('error in sending notification : '+error.message);
}
}

export async function sendNotificationController (req,res) {
    try {
        const { _id } = req.params;
        const { title, body } = req.body;
    
        // Find the user by user ID
        const user = await userModel.findById(_id);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Check if the user has FCM tokens
        if (!user.fcmTokens || user.fcmTokens.length === 0) {
          return res.status(400).json({ error: 'User does not have FCM tokens' });
        }
    
        // Choose one FCM token (you may have logic to select one if there are multiple)
        const fcmToken = user.fcmTokens[0];
    
        // Construct the FCM message
        const message = {
          notification: {
            title: title || 'Default Title',
            body: body || 'Default Body',
          },
          token: fcmToken,
        };
    
        // Send the FCM message
        const response = await getMessaging().send(message);
    
        console.log('Successfully sent message:', response);
        res.status(200).json({ message: 'Successfully sent message', token: fcmToken });
      } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

export async function sendNotificationToAllController (req,res) {
    try {
        const { title, body } = req.body;
    
        // Find all users
        const users = await userModel.find();
    
        if (!users || users.length === 0) {
          return res.status(404).json({ error: 'No users found' });
        }
    
        // Iterate through each user and send a push notification
        for (const user of users) {
          // Check if the user has FCM tokens
          if (user.fcmTokens && user.fcmTokens.length > 0) {
            // Choose one FCM token (you may have logic to select one if there are multiple)
            const fcmToken = user.fcmTokens[0];
    
            // Construct the FCM message
            const message = {
              notification: {
                title: title || 'Default Title',
                body: body || 'Default Body',
              },
              token: fcmToken,
            };
    
            // Send the FCM message
            const response = await getMessaging().send(message);
    
            console.log(`Successfully sent message to user ${user._id}:`, response);
          }
        }
    
        res.status(200).json({ message: 'Successfully sent messages to all users' });
      } catch (error) {
        console.error('Error sending messages:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}