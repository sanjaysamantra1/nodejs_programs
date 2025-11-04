const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    eId: { type: Number, required: true },
    name: { type: String, required: true },
    sal: { type: Number, required: true },
    gender: { type: String, required: true }
}, {
  toObject: { getters: true }, // Include virtuals when converting to object
  toJSON: { getters: true }    // Include virtuals when converting to JSON
})
employeeSchema.virtual('fullName').get(function() {
    return `${this.name} has Salary:: ${this.sal}`
})

let employeeModel = mongoose.model("employees", employeeSchema);

module.exports = employeeModel;