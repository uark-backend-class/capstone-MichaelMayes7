let GoogleStrategy = require('passport-google-oauth20').Strategy;
let User = require('./db').User;

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(
        new GoogleStrategy(
            {
                clientID:
                    process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: '/auth/google/callback'
            },
            async function(accessToken, refreshToken, profile, cb) {
                console.log(profile.emails[0].value);
                let existingUser = await User.findOne({
                    where: { email: profile.emails[0].value }
                });

                if (existingUser) {
                    cb(null, existingUser);
                } else {
                    let newUser = await User.create({
                        email: profile.emails[0].value
                    });
                    cb(null, newUser);
                }
            }
        )
    );
};