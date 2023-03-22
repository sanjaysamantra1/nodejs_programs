const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let employeeSchema = new Schema(
  {
    eId: {
      type: String,
    },
    name: {
      type: String,
    },
    sal: {
      type: Number,
    },
    gender: {
      type: String,
    },
  },
  { collection: "employees" }
);

module.exports = mongoose.model("employees", employeeSchema);
