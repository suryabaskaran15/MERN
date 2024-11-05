import { Router } from "express";
import signUpUser from "../controllers/authController/signUp.controller";
import { login } from "../controllers/authController/login.controller";
import passport from "passport";
import { CLIENT_BASE_URL } from "../config/config";
import { generateToken } from "../utils/jwtToken";
import { getUser } from "../controllers/authController/getUser.controller";
import userModel from "../models/user.model";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const authRouter = Router();

authRouter.post("/signup", signUpUser);
authRouter.post("/login", login);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/api/auth/google/callback', // Adjust according to your routing
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        let user = await userModel.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        }

        // If not, create a new user
        user = await new userModel({
            googleId: profile.id,
            userName: profile.displayName,
            email: profile?.emails ? profile?.emails[0]?.value : '',
            // thumbnail: profile._json.picture
        }).save();

        done(null, user);
    } catch (error) {
        done(error);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
// Google Auth Routes
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

authRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: `${CLIENT_BASE_URL}/login`, // Redirect to your login page on failure
}), (req, res) => {
    const token = generateToken(req?.user!);
    // Successful authentication, redirect to your desired page.
    res.cookie("jwt", token, {
        httpOnly: true, // Not accessible from JavaScript
        secure: false, // Set to true for production with HTTPS
    });

    res.redirect(CLIENT_BASE_URL); // Redirect to your client app
});


export default authRouter;