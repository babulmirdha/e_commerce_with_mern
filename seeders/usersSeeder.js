const { faker } = require("@faker-js/faker");
const User = require("../models/User");

async function seedUsers(count = 10) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const user = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roles: [faker.helpers.arrayElement(["admin", "customer", "editor"])]
    });
    users.push(user);
  }

  return User.insertMany(users);
}

module.exports = seedUsers;
