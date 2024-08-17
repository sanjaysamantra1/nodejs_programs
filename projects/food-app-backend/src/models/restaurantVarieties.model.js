const mongoose = require("mongoose");

const restaurantVarietiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: false,
  },
  cuisine: {
    type: Array,
    required: false,
  },
});
//mongoose.model(<collectionName>,<collectionSchema>)
const Varieties = mongoose.model(
  "restaurant_varieties",
  restaurantVarietiesSchema
);

module.exports = Varieties;
