
const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();

// Import models
const User = require("./models/user");
const Post = require("./models/post");
const Session = require("./models/session");

// Dummy data
const cities = ["Delhi", "Mumbai", "Pune", "Bangalore", "Jaipur"];

const names = [
  "Priyank",
  "Rahul",
  "Amit",
  "Neha",
  "Priya",
  "Ankit",
  "Rohit",
  "Sneha",
  "Karan",
  "Pooja",
];

const hashtagsList = [
  "instagram",
  "coding",
  "travel",
  "photography",
  "lifestyle",
  "food",
  "fitness",
  "technology",
];

// Helper function to get random value
const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Generate random users
const generateUsers = () => {
  const users = [];

  for (let i = 1; i <= 10000; i++) {
    users.push({
      name: getRandom(names),
      email: `user${i}@gmail.com`,
      gender: getRandom(["Male", "Female", "Other"]),
      city: getRandom(cities),
      age: Math.floor(Math.random() * 48) + 18,
      isActive: Math.random() > 0.2,
    });
  }

  return users;
};

// Generate random posts
const generatePosts = (userIds) => {
  const posts = [];

  for (let i = 1; i <= 50000; i++) {
    posts.push({
      userId: getRandom(userIds),
      caption: `This is my Instagram post number ${i}`,
      hashtags: [
        getRandom(hashtagsList),
        getRandom(hashtagsList),
      ],
      status: getRandom(["published", "draft", "archived"]),
      likesCount: Math.floor(Math.random() * 1000),
      isDeleted: Math.random() > 0.95,
    });
  }

  return posts;
};

// Generate random sessions
const generateSessions = (userIds) => {
  const sessions = [];

  for (let i = 1; i <= 500; i++) {
    sessions.push({
      userId: getRandom(userIds),
      token: crypto.randomBytes(32).toString("hex"),
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
    });
  }

  return sessions;
};

// Main seed function
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    // Clear existing collections
    await User.deleteMany({});
    await Post.deleteMany({});
    await Session.deleteMany({});

    console.log("Existing data cleared");

    // Step 1: Create users
    const users = generateUsers();

    const createdUsers = await User.insertMany(users);

    console.log(`${createdUsers.length} users created`);

    // Extract registered user IDs
    const userIds = createdUsers.map((user) => user._id);

    // Step 2: Create posts
    const posts = generatePosts(userIds);

    const createdPosts = await Post.insertMany(posts);

    console.log(`${createdPosts.length} posts created`);

    // Step 3: Create sessions
    const sessions = generateSessions(userIds);

    const createdSessions = await Session.insertMany(sessions);

    console.log(`${createdSessions.length} sessions created`);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

seedDatabase();
