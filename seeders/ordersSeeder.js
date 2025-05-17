const { faker } = require("@faker-js/faker");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

async function seedOrders(users, products, addresses, count = 10) {
  const orders = [];

  for (let i = 0; i < count; i++) {
    const orderUser = faker.helpers.arrayElement(users);
    const orderAddress = faker.helpers.arrayElement(addresses);
    const orderItems = [];
    let totalPrice = 0;

    for (let j = 0; j < faker.number.int({ min: 1, max: 5 }); j++) {
      const product = faker.helpers.arrayElement(products);
      const qty = faker.number.int({ min: 1, max: 3 });

      const item = await OrderItem.create({
        product: product._id,
        quantity: qty
      });

      orderItems.push(item);
      totalPrice += parseFloat(product.price.toString()) * qty;
    }

    orders.push({
      user: orderUser._id,
      items: orderItems.map(i => i._id),
      shippingAddress: orderAddress._id,
      totalPrice,
      status: faker.helpers.arrayElement(["pending", "shipped", "delivered"])
    });
  }

  return Order.insertMany(orders);
}

module.exports = seedOrders;
