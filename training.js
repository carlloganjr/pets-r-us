/* 
================================================================
    Title: training.js
    Author: Carl Logan
    Date: 9/9/2022
    Description: Training class and and array of objects for
    use in training.html through ejs.
================================================================
*/

// The Training class is the template for the other tiers
class Training {
  constructor(type, price) {
    this.type = type;
    this.price = price;
  }
}

// Inherits from Training class to create a puppy tier object
class PuppyTier extends Training {
  constructor(type, price) {
    super(type, price);
  }
}

// Inherits from Training class to create a adolescence tier object
class AdolescenceTier extends Training {
  constructor(type, price) {
    super(type, price);
  }
}

// Inherits from Training class to create a adult tier object
class AdultTier extends Training {
  constructor(type, price) {
    super(type, price);
  }
}

// array of puppy tier objects
const puppy = [
  new PuppyTier("Foundation", 100),
  new PuppyTier("Recognition", 175),
  new PuppyTier("Coexistence", 70)
];

// array of adolescence tier objects
const adolescence = [
  new AdolescenceTier("Leash Awareness", 150),
  new AdolescenceTier("Control", 210),
  new AdolescenceTier("Socializing", 105)
];

// array of adult tier objects
const adult = [
  new AdultTier("Old Dog, New Tricks", 255),
  new AdultTier("Best Behavior", 300),
  new AdultTier("Virtual Training", 190)
];

// exports the puppy, adolescence, adult arrays for use elsewhere.
module.exports = {puppy, adolescence, adult};