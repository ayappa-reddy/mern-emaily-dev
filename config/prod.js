// prod.js - production keys here!! commit this.
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  //which is madeup by us
  cookieKey: process.env.COOKIE_KEY
};