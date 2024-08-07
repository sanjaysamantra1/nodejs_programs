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