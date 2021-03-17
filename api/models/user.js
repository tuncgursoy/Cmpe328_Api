//-----------------------------------------------------
// Title: User
// Author: Tunç Gürsoy
// ID: 64528127274
// Section: 1
// Homework: 1
// Description: user id, name, surname, email address, Validation for the mongoDB 
//-----------------------------------------------------

const mongoose = require('mongoose');
 
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String, 
    surname : String,
    email : String,
    tc: String
}); 

module.exports = mongoose.model('user',userSchema);