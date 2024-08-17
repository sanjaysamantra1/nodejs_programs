const restaurantVarietiesModel = require("../models/restaurantVarieties.model");
const topRestaurantsModel = require("../models/topRestaurants.model");
const mongo = require("../database/mongo");

exports.getTopRestaurants = async (req, res) => {
  try {
    await mongo.connect();
    console.log("connection established");
    const topRestaurantsList = await topRestaurantsModel.find({});
    console.log(topRestaurantsList, "list");
    res.status(200).json(topRestaurantsList);
  } catch (error) {
    console.error("Error fetching top restaurants:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    mongo.disconnect();
  }
};

exports.getRestaurantVarieties = async (req, res) => {
  try {
    await mongo.connect();
    console.log("connection established");
    const varietiesList = await restaurantVarietiesModel.find({});
    console.log(varietiesList, "list");
    res.status(200).json(varietiesList);
  } catch (error) {
    console.error("Error in fetching:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    mongo.disconnect();
  }
};

exports.addRestaurantVarieties = async (req, res) => {
  try {
    await mongo.connect();
    console.log("connection established");
    await restaurantVarietiesModel.create(req.body);
    res.status(200).send("Inserted successfully"); // Send the saved document as response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  } finally {
    mongo.disconnect();
  }
};

exports.removeRestaurantVariety = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "from query");
    await mongo.connect();
    const deleteFood = await restaurantVarietiesModel.findByIdAndDelete(id);
    if (!deleteFood) {
      return res.status(404).json({ message: "not found!" });
    }
    res.status(200).json(deleteFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  } finally {
    await mongo.disconnect();
  }
};
