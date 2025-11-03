// print all the cities
db.cities.aggregate([
    { $match: {} }
])

// print the cities from from NorthAmerica continent
db.cities.aggregate([
    { $match: { "continent": "North America" } }
])

// print the cities from from NorthAmerica/Asia continent
db.cities.aggregate([
    { $match: { "continent": { $in: ["North America", "Asia"] } } }
])


// sort the cities by population(desc)
db.cities.aggregate([
    { $sort: { "population": -1 } }
])

// Find total number cities per continent
db.cities.aggregate([
    { $group: { _id: '$continent', totalCities: { $sum: 1 } } }
])

// Find average population per continent
db.cities.aggregate([
    { $group: { _id: '$continent', avgPopulation: { $avg: '$population' } } }
])

// Sort All Cities by population (descending)
db.cities.aggregate([
    { $sort: { population: -1 } },
    { $project: { _id: 0, name: 1, country: 1, population: 1 } }
])

// Top 3 Most populated cities in Asia
db.cities.aggregate([
    { $match: { continent: 'Asia' } },
    { $sort: { population: -1 } },
    { $limit: 3 },
    { $project: { _id: 0, name: 1, country: 1, population: 1 } }
])

// Display countries & Count of countries represented per continent
db.cities.aggregate([
    { $group: { _id: '$continent', countries: { $addToSet: '$country' } } },
    { $project: { _id: 1, countries: 1, totalCountries: { $size: '$countries' } } },
])