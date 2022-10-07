/* 
================================================================
    Title: booking.js
    Author: Carl Logan
    Date: 9/26/2022
    Description: Set the model for the database entries.
================================================================
*/

// import mongoose
const mongoose = require("mongoose");

// create the document plan
const bookingSchema = mongoose.Schema({
  username: {type: String, required: true, unique: false},
  firstName: {type: String, required: true, unique: false},
  lastName: {type: String, required: true, unique: false},
  email: {type: String, required: true, unique: false},
  service: {type: String, required: true, unique: false}
});

// export the model for use in creating documents
module.exports = mongoose.model("Booking", bookingSchema);