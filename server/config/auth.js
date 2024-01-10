require('dotenv').config()


module.exports= {
    facebookAuth: {
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        clientID: process.env.FACEBOOK_CLIENT_ID,
        callbackURL: process.env.SERVER_URL + '/auth/facebook/callback' 
    },

    googleAuth: {
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        clientID: process.env.GOOGLE_CLIENT_ID,
        callbackURL: process.env.SERVER_URL + '/auth/google/callback' 
    }

}