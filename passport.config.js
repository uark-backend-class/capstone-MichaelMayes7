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
                    '329103155091-a0dj020n3e10c0oe0gnsr0u4ulc7gdlb.apps.googleusercontent.com',
                clientSecret: 'EjHLGCy19ep2k1-UhBVv-2gA',
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