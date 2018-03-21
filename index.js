const express = require('express');
const mongoose = require('mongoose');
//because express can't handle cookies
const cookieSession = require('cookie-session');
//because we need to tell passport to enable cookies
//which were made accessible in the first place in express
//by cookie-session
const passport = require('passport');

const keys = require('./config/keys');
//we need to require our user.js before requiring passport.js
//because we use the user instance in passport.js
//(order of require statements matters)
require('./models/User');
//to run all the code in passport.js
require('./services/passport');
// authRoutes is a function that takes in the app arg
//const authRoutes = require('./routes/authRoutes');
//don't write the actual mongoURI here, which would enable
//anyone to modify our database
//to connect to the mongo DB in mlab
mongoose.connect(keys.mongoURI);

const app = express();


//Middelwares are small functions that we can use to
//modify incoming requests before they are sent to 
//the route handlers.

//telling express to make use of cookies in our application
//express middleware(app.use())
//cookieSession take a configuration object
//where we set the maxAge of the cookie which
//is how long the cookie will stay in the browser
//before it epires. Also we set keys which encrypts
//the cookie and the 'id' it contains, so no one can
//modify or hack it. Because it's important, we add it to
//keys.js and not commit it.
app.use(
    //cookieSession middleware
    //cookieSession extracts the cookie and populates
    //req.session which is then used by the passport
    //middleware.
    cookieSession({
        //maxAge needs milliseconds(for 30 days we have)
        // days * hours * min * sec * ms
        maxAge: 30 * 24 * 60 * 60 *1000,
        //keys is an array, so that we can add other
        //cookie keys, so that cookieSession can
        //encrypt the cookie with a random key from the
        //array for additional layer of security.
        keys: [keys.cookieKey]
    })
);

//tell passport to make use of cookies for authentication.
//passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//requiring authRoutes returns a function which requires
//the express app as an argument.
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Started app on port 5000');
});
