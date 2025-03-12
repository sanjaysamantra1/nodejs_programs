db.inventory.insertMany([
   { prodId: 100, price: 20, quantity: 125 },
   { prodId: 101, price: 10, quantity: 234 },
   { prodId: 102, price: 15, quantity: 432 },
   { prodId: 103, price: 17, quantity: 320 }
])

db.orders.insertMany([
   { orderId: 201, custid: 301, prodId: 100, numPurchased: 20 },
   { orderId: 202, custid: 302, prodId: 101, numPurchased: 10 },
   { orderId: 203, custid: 303, prodId: 102, numPurchased: 5 },
   { orderId: 204, custid: 303, prodId: 103, numPurchased: 15 },
   { orderId: 205, custid: 303, prodId: 103, numPurchased: 20 },
   { orderId: 206, custid: 302, prodId: 102, numPurchased: 1 },
   { orderId: 207, custid: 302, prodId: 101, numPurchased: 5 },
   { orderId: 208, custid: 301, prodId: 100, numPurchased: 10 },
   { orderId: 209, custid: 303, prodId: 103, numPurchased: 30 }
])


db.createView( "sales", "orders", [
    {
       $lookup:
          {
             from: "inventory",
             localField: "prodId",
             foreignField: "prodId",
             as: "inventoryDocs"
          }
    },
    {
       $project:
          {
            _id: 0,
            prodId: 1,
            orderId: 1,
            numPurchased: 1,
            price: "$inventoryDocs.price"
          }
    },
       { $unwind: "$price" }
 ] )


 // find the total amount sold of each product
 db.sales.aggregate( [
   {
    $group:
       {
          _id: "$prodId",
          amountSold: { $sum: { $multiply: [ "$price", "$numPurchased" ] } }
       }
 }
] )