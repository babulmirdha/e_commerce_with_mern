const { faker } = require("@faker-js/faker");
const Product = require("../models/Product");

async function seedProducts(categories, count = 20) {
  const products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
      description: faker.commerce.productDescription(),
      categories: faker.helpers.arrayElements(categories.map(c => c._id), 2)
    });
  }

  return Product.insertMany(products);
}

module.exports = seedProducts;
