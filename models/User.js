const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
//obj destructuring
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
    //alternative to if, else checking to see if a user doc
    //already exists in passport.js after getting the profile.id
    // googleId: {
    //     type: String,
    //     unique: true
    // }
});

//loading a schema into the mongoose
mongoose.model('users', userSchema);
//we don't export this model anywhere because of problems
//during testing with(mocha, jest(expect))

