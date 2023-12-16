import express from "express";
import session  from 'express-session';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import  passport  from "passport";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./src/config/configDB.js";
import authRouter from "./src/routers/AuthRouter.js";
import achievementRouter from "./src/routers/AchievementRouter.js";
import userRouter from "./src/routers/UserRouter.js";
import levelRouter from "./src/routers/LevelRouter.js";
import adminRouter from "./src/routers/AdminRouter.js";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };



const app = express();

app.set('view engine','ejs');

app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use(session({resave: false,saveUninitialized: true,secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());
/*app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
  });*/
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "adminpushnotification-376e4",
    });


// Set up Google OAuth strategy
var userProfile;
const GOOGLE_CLIENT_ID = '479174792699-3j9st18bejecoutiorib1mutmej2rasn.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
    // callbackURL: "https://a5cb-122-175-148-85.ngrok-free.app/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

// Serialize & Deserialize user information to store in the session
passport.serializeUser(function(user, cb) {cb(null, user);});
passport.deserializeUser(function(obj, cb){ cb(null, obj);});

// routes
app.get('/',(req,res)=>{res.render('auth')})
app.use('/auth',authRouter);
app.use('/achievement',achievementRouter);
app.use('/user',userRouter);
app.use('/level',levelRouter);
app.use('/admin',adminRouter)


const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0',() => {
  connectDB();
  console.log("running at 3000");
});