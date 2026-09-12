const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const App = mongoose.model("App", appSchema);

module.exports = App;
