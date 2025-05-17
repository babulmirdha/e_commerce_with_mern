const { faker } = require("@faker-js/faker");
const Address = require("../models/Address");

async function seedAddresses(users, count = 5) {
  const addresses = [];

  for (let i = 0; i < count; i++) {
    addresses.push({
      user: faker.helpers.arrayElement(users)._id,
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country()
    });
  }

  return Address.insertMany(addresses);
}

module.exports = seedAddresses;
