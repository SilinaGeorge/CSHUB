FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('../config/auth.js');
const Users = require("../mongo-models/users.js");

module.exports = function (router, passport) {

    router.use(passport.initialize());
    router.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Users.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'email', 'first_name', 'last_name']
    },
        function (accessToken, refreshToken, profile, done) {
            Users.findOne({ 'facebook_id': profile.id, 'facebook': true }, function (err, user) {
                if (err) { return done(err); }
                if (user) {
                    done(null, user);
                }
                else {
                    newUser = new Users();
                    newUser.facebook_id = profile.id;
                    newUser.email = profile.emails[0].value;
                    newUser.firstname = profile.name.givenName;
                    newUser.lastname = profile.name.familyName;
                    newUser.accessToken = accessToken;
                    newUser.facebook = true;
                    newUser.google = false;
                    newUser.local = false;
                    newUser.save(function (err, user) {
                        if (err) throw err;
                        if (user) {
                            done(null, user);
                        }
                    });

                }
            });
        }
    ));

}