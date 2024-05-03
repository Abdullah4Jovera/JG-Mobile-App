const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/userModel");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists in the database
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    // If user does not exist, create a new user
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null, 
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({ _id: id });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
