const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/users", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / limit);

  const users = await User.find()
    .sort({ createdAt: -1, _id: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    totalUsers,
    totalPages,
    currentPage: page,
    limit,
    users,
  });
});

// router.get("/users", async (req, res) => {
//   let { cursor, limit=50 } = req.query;
//   const users = await User.find(cursor ? { _id: { $gt: cursor } } : {})
//     .sort({ _id: 1 })
//     .limit(Number(limit));
//   res.status(200).json({
//     data: users,
//   });
// });

module.exports = router;
