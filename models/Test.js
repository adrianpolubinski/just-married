const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "This field is required.",
  },
  lastName: {
    type: String,
    required: "This field is required.",
  },
});

module.exports = mongoose.model("Test", testSchema);
