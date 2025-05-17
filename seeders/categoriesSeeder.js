const { faker } = require("@faker-js/faker");
const Category = require("../models/Category");

async function seedCategories(count = 5) {
  const categories = [];

  for (let i = 0; i < count; i++) {
    categories.push({
      name: faker.commerce.department(),
      description: faker.lorem.sentence()
    });
  }

  return Category.insertMany(categories);
}

module.exports = seedCategories;
