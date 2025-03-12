db.orders.insertMany([
    { "_id": 1, "customer_id": 101, "product_id": 201, "amount": 500 },
    { "_id": 2, "customer_id": 102, "product_id": 202, "amount": 1000 },
    { "_id": 3, "customer_id": 101, "product_id": 203, "amount": 750 }
])

db.customers.insertMany([
    { "_id": 101, "name": "Alice", "city": "New York" },
    { "_id": 102, "name": "Bob", "city": "Los Angeles" },
    { "_id": 103, "name": "Charlie", "city": "Chicago" }
])

db.products.insertMany([
    { "_id": 201, "name": "Laptop", "price": 1200 },
    { "_id": 202, "name": "Phone", "price": 800 },
    { "_id": 203, "name": "Tablet", "price": 600 }
])

db.orders.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_info"
        }
    }
])

db.orders.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_info"
        }
    },
    { $unwind: "$customer_info" }
])

db.orders.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_info"
        }
    },
    { $unwind: "$customer_info" },
    { $match: { "customer_info.city": "New York" } }
])


db.orders.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_info"
        }
    },
    { $unwind: "$customer_info" },  // Flatten customer_info array
    {
        $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product_info"
        }
    },
    { $unwind: "$product_info" },  // Flatten product_info array
    {
        $project: {
            _id: 1,
            amount: 1,
            "customer_name": "$customer_info.name",
            "customer_city": "$customer_info.city",
            "product_name": "$product_info.name",
            "product_price": "$product_info.price"
        }
    }
])



