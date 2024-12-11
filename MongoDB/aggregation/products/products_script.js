// print the count of each category
db.products.aggregate([
    { "$group": { _id: "$category", count: { $sum: 1 } } }
])

// Calculate the Average Price per Category
db.products.aggregate([
    { "$group": { _id: "$category", averagePrice: { $avg: '$price' } } }
])

// print Sum of Product Stock in Each Category
db.products.aggregate([
    { "$group": { _id: "$category", totalStock: { $sum: '$quantity' } } }
])

// Print name,price for the products of category-electronics
db.products.aggregate([
    { $match: { category: 'Electronics' } },
    { $project: { name: 1, price: 1 } }
])

// Print name,price for the products of category-electronics with alias name for columns
// product_name is alias for name , product_price is alias for price
db.products.aggregate([
    { $match: { category: 'Electronics' } },
    { $project: { product_name: '$name', product_price: '$price' } }
])

// Print name,price,discountedPrice(10%) for the products 
db.products.aggregate([
    {
        $project: {
            productName: '$name',
            originalPrice: '$price',
            discountedPrice: { $multiply: ['$price', 0.90] }, // Apply 10% discount
            _id: 0  // don't show this column
        }
    }
])

// Calculate Discounted Price and amountSaved
db.products.aggregate([
    {
        $project: {
            productName: '$name',
            originalPrice: '$price',
            afterDiscount: { $multiply: ['$price', 0.90] }, // Apply 10% discount
            amountSaved: {  $multiply: ['$price', 0.10] }, // Discount percentage (10%)
            _id: 0  // don't show this column
        }
    }
])

// Find name , price of  Top 2 'electronics' products by price
db.products.aggregate([
    { $match: { category: 'Electronics' } },
    { $sort: { "price": -1 } },
    { $project: { name: 1, price: 1 } },
    { $limit: 2 }
]);


