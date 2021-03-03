//user id, name, surname, email address
const mongoose = require('mongoose');
 
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String, 
    surname : String,
    email : String
}); 

module.exports = mongoose.model('user',userSchema);