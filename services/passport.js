//we don't export anything becuase we want to run all
//this code in index.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

//we can pull a model out of mongoose by giving 
//a single argument. Two arguments(with schema) means
//we are loading something into the model.
//This is an alternative to exporting the model which 
//could cause unexpected problems during testing(mocha)
const User = mongoose.model('users');

//to generate an identifying piece for info so that passsport
//can set or add it to a cookie(Set-Cookie).
//The user(1st arg) in serializeUser is the 
//user sent as the 2nd argument(from the db) 
//in the done call in the callback defined below(done(null, existingUser)).
//There we called done to let passport continuee with the
//authentication flow which is then continued below
passport.serializeUser((user, done) => {
    //straightforward process, so no chance of error.
    //so we set err argument to null.
    //This id here is not the profile.id(googleId) that we got
    //from google.
    //It is the _id property that mongo automatically creates
    //when a document is added. We don't use google id here
    //because we may use other authentications(like fb, twitter)
    //whose id will not be the same as googles but _id will
    //always be unique for a document. Also we don't have 
    //to explicitly write (user._id). user.id automatically
    //refers to the _id property
    done(null, user.id);
});

//take the id set or added in the cookie by passport
//and convert it into the user model(by querying the users collection)
//for the doc with that _id prop.
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user); 
        //proceeds to the next step in the authentication flow
        //(final step(read /api/current_user)) 
    });
});

//making passport(general) use an instance of 
//GoogleStrategy(a specific strategy)
//passing options object to the instance(takes 2 args) 
//to let google know about our app when the user 
//authenticates it. 
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        //third option lets us send or redirect the user 
        //to a route after they grant us the permission.
        //we handle this route in index.js
        callbackURL: '/auth/google/callback',
        //telling GoogleStrategy to trust any proxies
        //it encounters(like the heroku proxy)
        proxy: true
        //the callback is called after we get the actual user profile
    }, (accessToken, refreshToken, profile, done) => {
        // //access token tells google what permissions the 
        // //user gave us in the past
        // console.log('access token', accessToken);
        // //refresh token would allow us to refresh our access
        // //token since it expires after sometime
        // console.log('refresh token', refreshToken);
        // //all the info about user profile
        // console.log('profile', profile);

        //any action done on db is asnc, so these methods 
        //return a promise
        //we use findOne to make sure that we don't create a 
        //user document again if it already has the same googleId
        //it returns null if no doc is found, else returns the doc.
        //alternative is using mongoose validators(unique:true) in schema.
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                   // we already have a record with the given profile.id
                   //we call done(2 args)(err, doc) to tell passport that we are done creating
                   //the user and that it should proceed with the authentication
                   //flow. null means that there were no errors here
                   done(null, existingUser);
                } else {
                    // we don't have a user record with this ID; make a new record
                    //we use a model class to create a new instance(record/document) 
                    //of a user and save it, here of all the places, because this is where the googleId
                    //is, in profile.id(which is our unique identifier)
                    new User({ googleId: profile.id })
                        .save()
                        .then((user) => done(null, user));
                }
            });
    })
);
