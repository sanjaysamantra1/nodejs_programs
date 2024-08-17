const mongoose = require("mongoose");

const topRestaurantsSchema = mongoose.Schema({
  imgUrl: {
    type: String,
  },
  restaurantName: {
    type: String,
  },
  restaurantAddress: {
    type: String,
  },
  cuisines: {
    type: [String],
  },
  avgRating: {
    type: String,
  },
  discount: {
    type: String,
  },
  restaurantId: {
    type: String,
  },
});

module.exports = mongoose.model(
  "topRestaurants",
  topRestaurantsSchema,
  "top_restaurants"
);
