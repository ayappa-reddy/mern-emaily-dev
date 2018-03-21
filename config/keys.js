//keys.js - figure out what set of credentials to return
//depending on dev vs prod environment

//NODE_ENV will be set to production automatically by heroku
//if block to decide whether to send dev keys or prod keys
//to whichever file is requiring keys.js
if (process.env.NODE_ENV === 'production') {
    // we are in production - return the prod set of keys.
    module.exports = require('./prod');
} else {
    // we are in development - return the dev keys.
    // require dev.js and immediately export it to whichever
    // file is asking for the keys.js.
    module.exports = require('./dev');
}