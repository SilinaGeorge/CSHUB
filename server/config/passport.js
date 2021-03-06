FacebookStrategy = require('passport-facebook').Strategy;
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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


    //facebook passport
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'email', 'first_name', 'last_name']
    },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                Users.findOne({ 'social_id': profile.id, 'facebook': true }, function (err, user) {
                    if (err) { return done(err); }
                    if (user) {
                        done(null, user);
                    }
                    else {
                        newUser = new Users();
                        newUser.social_id = profile.id;
                        newUser.email = profile.emails[0].value;
                        newUser.firstname = profile.name.givenName;
                        newUser.lastname = profile.name.familyName;
                        newUser.accessToken = accessToken;
                        newUser.facebook = true;
                        newUser.google = false;
                        newUser.local = false;
                        newUser.spotifyurl = 'https://open.spotify.com/embed/playlist/37i9dQZF1CAjTirSpYapUx';
                        newUser.notifications = [];
                        newUser.spaceleft = 90000000;
                        newUser.save(function (err, user) {
                            if (err) throw err;
                            if (user) {
                                done(null, user);
                            }
                        });

                    }
                });
            });
        }
    ));


    // google passport

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            Users.findOne({ 'social_id': profile.id, 'google': true }, function (err, user) {
                if (err) { return done(err); }
                if (user) {
                    done(null, user);
                }
                else {
                    newUser = new Users();
                    newUser.social_id = profile.id;
                    newUser.email = profile.emails[0].value;
                    newUser.firstname = profile.name.givenName;
                    newUser.lastname = profile.name.familyName;
                    newUser.accessToken = accessToken;
                    newUser.facebook = false;
                    newUser.google = true;
                    newUser.local = false;
                    newUser.spotifyurl = 'https://open.spotify.com/embed/playlist/37i9dQZF1CAjTirSpYapUx',
                    newUser.notifications = [];
                    newUser.spaceleft = 90000000;
                    newUser.save(function (err, user) {
                        if (err) throw err;
                        if (user) {
                            done(null, user);
                        }
                    });

                }
            });
        });
    }
    ));

  



}