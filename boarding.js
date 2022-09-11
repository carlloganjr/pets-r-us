/* 
================================================================
    Title: boarding.js
    Author: Carl Logan
    Date: 9/9/2022
    Description: Boarding class and and array of objects for
    use in boarding.html through ejs.
================================================================
*/

// The Boarding class is as a template for creating objects for
// the cost of boarding information on boarding.html
class Boarding {
  constructor(petQty, nights, costPerNight) {
    this.petQty = petQty;
    this.nights = nights;
    this.costPerNight = costPerNight;
  }
}

// An array of objects used to fill in the cost of boarding
// section in boarding.html
const boardingInfo = [
  new Boarding("1 pet", "5 nights", 20),
  new Boarding("1 pet", "more than 5 nights", 17),
  new Boarding("2 pets", "5 nights", 38),
  new Boarding("2 pets", "more than 5 nights", 35),
  new Boarding("3 pets", "5 nights", 65),
  new Boarding("3 pets", "more than 5 nights", 60)
];

// export the array of objects for use outside of this file
module.exports = {boardingInfo};