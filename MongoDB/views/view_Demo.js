db.createView(
    "firstYears",
    "students",
    [{ $match: { year: 1 } }]
)

db.firstYears.find({}, { _id: 0 } )