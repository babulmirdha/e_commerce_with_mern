const { faker } = require("@faker-js/faker");
const Review = require("../models/Review");

async function seedReviews(users, products, count = 20) {
  const reviews = [];

  for (let i = 0; i < count; i++) {
    reviews.push({
      user: faker.helpers.arrayElement(users)._id,
      product: faker.helpers.arrayElement(products)._id,
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(2)
    });
  }

  return Review.insertMany(reviews);
}

module.exports = seedReviews;
