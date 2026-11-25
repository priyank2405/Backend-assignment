
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const { randomUUID } = require("crypto");
require("dotenv").config();

const User = require("./models/user");

const TOTAL_USERS = 100000;
const BATCH_SIZE = 5000;

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Gurgaon",
  "Noida",
  "Chennai",
  "Kolkata",
  "Jaipur",
];

const generateUsers = (count) => {
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: `${randomUUID()}@example.com`,
    age: faker.number.int({ min: 18, max: 65 }),
    city: faker.helpers.arrayElement(cities),
    createdAt: faker.date.recent({ days: 365 }),
  }));
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");

    await User.init();

    for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
      const currentBatch = Math.min(
        BATCH_SIZE,
        TOTAL_USERS - i
      );

      const users = generateUsers(currentBatch);

      await User.insertMany(users, { ordered: false });

      console.log(
        `${Math.min(i + currentBatch, TOTAL_USERS)} users inserted`
      );
    }

    console.log("100,000 users seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

seedUsers();
