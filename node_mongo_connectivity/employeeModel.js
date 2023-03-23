const mongoose = require("mongoose");

let employeeSchema = new mongoose.Schema(
  {
    eId: {
      type: String,
      required: true,
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

const employeeModel = mongoose.model("employees", employeeSchema);
module.exports = employeeModel;
